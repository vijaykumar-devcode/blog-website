const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please add some content']
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
        default: null
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
