const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: String,
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
