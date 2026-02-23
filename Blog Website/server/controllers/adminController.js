const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

// Get dashboard stats
exports.getStats = async (req, res, next) => {
    try {
        const totalPosts = await Post.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalComments = await Comment.countDocuments();
        const pendingPosts = await Post.countDocuments({ status: 'submitted' });

        const mostActiveAuthors = await Post.aggregate([
            { $group: { _id: '$author', postCount: { $sum: 1 } } },
            { $sort: { postCount: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'authorDetails'
                }
            },
            { $unwind: '$authorDetails' },
            {
                $project: {
                    postCount: 1,
                    'authorDetails.name': 1,
                    'authorDetails.email': 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalPosts,
                totalUsers,
                totalComments,
                pendingPosts,
                mostActiveAuthors
            }
        });
    } catch (err) {
        next(err);
    }
};

// Approve/Reject Post
exports.reviewPost = async (req, res, next) => {
    try {
        const { status, rejectionReason } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        post.status = status;
        if (status === 'rejected') {
            post.rejectionReason = rejectionReason;
        }
        if (status === 'published') {
            post.publishedAt = Date.now();
        }

        await post.save();

        res.status(200).json({ success: true, data: post });
    } catch (err) {
        next(err);
    }
};

// Manage Users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (err) {
        next(err);
    }
};

exports.updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};
