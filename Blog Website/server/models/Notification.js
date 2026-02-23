const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: ['comment', 'like', 'follow', 'post_approved', 'post_rejected', 'mention'],
        required: true
    },
    post: { type: mongoose.Schema.ObjectId, ref: 'Post' },
    comment: { type: mongoose.Schema.ObjectId, ref: 'Comment' },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
