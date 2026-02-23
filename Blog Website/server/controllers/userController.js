const User = require('../models/User');
const Notification = require('../models/Notification');
const Post = require('../models/Post');

// Update profile
exports.updateProfile = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            bio: req.body.bio,
            avatar: req.body.avatar
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

// Get author profile
exports.getAuthorProfile = async (req, res, next) => {
    try {
        const author = await User.findById(req.params.id)
            .populate('followers', 'name avatar')
            .populate('following', 'name avatar');

        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }

        const posts = await Post.find({ author: req.params.id, status: 'published' });

        res.status(200).json({
            success: true,
            data: {
                profile: author,
                posts: posts
            }
        });
    } catch (err) {
        next(err);
    }
};

// Follow user
exports.followUser = async (req, res, next) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToFollow) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (userToFollow._id.toString() === currentUser._id.toString()) {
            return res.status(400).json({ success: false, message: 'You cannot follow yourself' });
        }

        if (currentUser.following.includes(userToFollow._id)) {
            // Unfollow
            currentUser.following = currentUser.following.filter(id => id.toString() !== userToFollow._id.toString());
            userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== currentUser._id.toString());
        } else {
            // Follow
            currentUser.following.push(userToFollow._id);
            userToFollow.followers.push(currentUser._id);

            // Notification
            await Notification.create({
                recipient: userToFollow._id,
                sender: currentUser._id,
                type: 'follow'
            });
        }

        await currentUser.save();
        await userToFollow.save();

        res.status(200).json({ success: true, data: currentUser.following });
    } catch (err) {
        next(err);
    }
};

// Get notifications
exports.getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .sort('-createdAt')
            .populate('sender', 'name avatar')
            .populate('post', 'title slug')
            .populate('comment', 'content');

        res.status(200).json({ success: true, data: notifications });
    } catch (err) {
        next(err);
    }
};

// Mark notifications as read
exports.markNotificationsRead = async (req, res, next) => {
    try {
        await Notification.updateMany(
            { recipient: req.user.id, isRead: false },
            { isRead: true }
        );

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
