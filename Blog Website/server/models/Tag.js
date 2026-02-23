const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a tag name'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tag', tagSchema);
