const mongoose = require('mongoose');

const viewHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.ObjectId, ref: 'Post', required: true },
    ip: String,
    viewedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ViewHistory', viewHistorySchema);
