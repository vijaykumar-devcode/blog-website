const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reporter: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.ObjectId, ref: 'Post' },
    comment: { type: mongoose.Schema.ObjectId, ref: 'Comment' },
    reason: { type: String, required: true },
    status: { type: String, enum: ['pending', 'resolved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
