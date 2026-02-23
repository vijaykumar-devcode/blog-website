const Comment = require('../models/Comment');
const Post = require('../models/Post');
const Notification = require('../models/Notification');

// Create comment
exports.createComment = async (req, res, next) => {
    try {
        const { content, postId, parentId } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const comment = await Comment.create({
            content,
            post: postId,
            user: req.user.id,
            parent: parentId || null
        });

        // Create notification for post author
        if (post.author.toString() !== req.user.id) {
            await Notification.create({
                recipient: post.author,
                sender: req.user.id,
                type: 'comment',
                post: postId,
                comment: comment._id
            });
        }

        res.status(201).json({ success: true, data: comment });
    } catch (err) {
        next(err);
    }
};

// Update comment
exports.updateComment = async (req, res, next) => {
    try {
        let comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        // Check ownership
        if (comment.user.toString() !== req.user.id && !['admin', 'super_admin'].includes(req.user.role)) {
            return res.status(401).json({ success: false, message: 'User not authorized to update this comment' });
        }

        comment = await Comment.findByIdAndUpdate(req.params.id, { content: req.body.content }, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: comment });
    } catch (err) {
        next(err);
    }
};

// Delete comment (soft delete)
exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        // Check ownership
        if (comment.user.toString() !== req.user.id && !['admin', 'super_admin'].includes(req.user.role)) {
            return res.status(401).json({ success: false, message: 'User not authorized to delete this comment' });
        }

        comment.isDeleted = true;
        await comment.save();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
