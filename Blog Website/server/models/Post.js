const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: String,
    content: {
        type: String,
        required: [true, 'Please add some content']
    },
    excerpt: {
        type: String,
        maxlength: [500, 'Excerpt cannot be more than 500 characters']
    },
    featuredImage: String,
    status: {
        type: String,
        enum: ['draft', 'submitted', 'approved', 'published', 'archived', 'rejected'],
        default: 'draft'
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }],
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag'
    }],
    metaTitle: String,
    metaDescription: String,
    views: {
        type: Number,
        default: 0
    },
    readTime: Number,
    isFeatured: {
        type: Boolean,
        default: false
    },
    publishedAt: Date,
    rejectionReason: String,
    revisionHistory: [{
        content: String,
        editedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
        editedAt: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create post slug from title
postSchema.pre('save', function () {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true });
    }
});

// Virtual for comments
postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
    justOne: false
});

module.exports = mongoose.model('Post', postSchema);
