const Post = require('../models/Post');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const Like = require('../models/Like');
const Bookmark = require('../models/Bookmark');
const Notification = require('../models/Notification');

// Get all posts (public)
exports.getPosts = async (req, res, next) => {
    try {
        let query;
        const reqQuery = { ...req.query };
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Base query: only published posts for public API
        let queryObj = JSON.parse(queryStr);
        queryObj.status = 'published';

        // Filter by category slug if provided
        if (req.query.category) {
            const cat = await Category.findOne({ slug: req.query.category });
            if (cat) {
                queryObj.categories = cat._id;
            } else {
                // Return empty if category not found
                return res.status(200).json({ success: true, count: 0, data: [] });
            }
        }

        // Add search functionality
        if (req.query.search) {
            queryObj.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { content: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        query = Post.find(queryObj).populate('author', 'name avatar').populate('categories', 'name').populate('tags', 'name');

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Post.countDocuments(queryObj);

        query = query.skip(startIndex).limit(limit);

        const posts = await query;

        // Pagination result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = { page: page + 1, limit };
        }
        if (startIndex > 0) {
            pagination.prev = { page: page - 1, limit };
        }

        res.status(200).json({
            success: true,
            count: posts.length,
            pagination,
            data: posts
        });
    } catch (err) {
        next(err);
    }
};

// Get single post
exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
            .populate('author', 'name avatar bio')
            .populate('categories', 'name')
            .populate('tags', 'name')
            .populate({
                path: 'comments',
                match: { isDeleted: false, parent: null },
                populate: { path: 'user', select: 'name avatar' }
            });

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Only allow viewing published posts unless author/admin
        if (post.status !== 'published') {
            if (!req.user || (post.author._id.toString() !== req.user.id && !['admin', 'super_admin', 'editor'].includes(req.user.role))) {
                return res.status(401).json({ success: false, message: 'You are not authorized to view this draft' });
            }
        }

        // Increment views
        post.views += 1;
        await post.save();

        res.status(200).json({ success: true, data: post });
    } catch (err) {
        next(err);
    }
};

// Create post
exports.createPost = async (req, res, next) => {
    try {
        req.body.author = req.user.id;

        // If role is contributor, status is always draft/submitted
        if (req.user.role === 'contributor') {
            req.body.status = 'submitted';
        }

        const post = await Post.create(req.body);

        res.status(201).json({ success: true, data: post });
    } catch (err) {
        next(err);
    }
};

// Update post
exports.updatePost = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Check ownership
        if (post.author.toString() !== req.user.id && !['admin', 'super_admin', 'editor'].includes(req.user.role)) {
            return res.status(401).json({ success: false, message: 'User not authorized to update this post' });
        }

        post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: post });
    } catch (err) {
        next(err);
    }
};

// Delete post
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Check ownership
        if (post.author.toString() !== req.user.id && !['admin', 'super_admin'].includes(req.user.role)) {
            return res.status(401).json({ success: false, message: 'User not authorized to delete this post' });
        }

        await post.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

// Like/Unlike post
exports.toggleLike = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const existingLike = await Like.findOne({ user: req.user.id, post: req.params.id });

        if (existingLike) {
            await existingLike.deleteOne();
            res.status(200).json({ success: true, message: 'Post unliked' });
        } else {
            await Like.create({ user: req.user.id, post: req.params.id });

            // Notification
            if (post.author.toString() !== req.user.id) {
                await Notification.create({
                    recipient: post.author,
                    sender: req.user.id,
                    type: 'like',
                    post: post._id
                });
            }

            res.status(200).json({ success: true, message: 'Post liked' });
        }
    } catch (err) {
        next(err);
    }
};

// Bookmark/Unbookmark post
exports.toggleBookmark = async (req, res, next) => {
    try {
        const existingBookmark = await Bookmark.findOne({ user: req.user.id, post: req.params.id });

        if (existingBookmark) {
            await existingBookmark.deleteOne();
            res.status(200).json({ success: true, message: 'Post removed from bookmarks' });
        } else {
            await Bookmark.create({ user: req.user.id, post: req.params.id });
            res.status(200).json({ success: true, message: 'Post bookmarked' });
        }
    } catch (err) {
        next(err);
    }
};

// Get my posts
exports.getMyPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ author: req.user.id }).sort('-createdAt');
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        next(err);
    }
};
