const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['super_admin', 'admin', 'editor', 'author', 'contributor', 'user'],
        lowercase: true
    },
    permissions: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);
