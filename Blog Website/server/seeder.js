const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Post = require('./models/Post');
const Category = require('./models/Category');
const Tag = require('./models/Tag');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const users = [
    { name: 'Super Admin', email: 'superadmin@blog.com', password: 'password123', role: 'super_admin' },
    { name: 'Admin 1', email: 'admin1@blog.com', password: 'password123', role: 'admin' },
    { name: 'Admin 2', email: 'admin2@blog.com', password: 'password123', role: 'admin' },
    { name: 'Editor 1', email: 'editor1@blog.com', password: 'password123', role: 'editor' },
    { name: 'Editor 2', email: 'editor2@blog.com', password: 'password123', role: 'editor' },
    { name: 'Author 1', email: 'author1@blog.com', password: 'password123', role: 'author' },
    { name: 'Author 2', email: 'author2@blog.com', password: 'password123', role: 'author' },
    { name: 'Author 3', email: 'author3@blog.com', password: 'password123', role: 'author' },
    { name: 'Author 4', email: 'author4@blog.com', password: 'password123', role: 'author' },
    { name: 'Author 5', email: 'author5@blog.com', password: 'password123', role: 'author' },
    { name: 'User 1', email: 'user1@blog.com', password: 'password123', role: 'user' }
];

const categories = [
    { name: 'Technology', slug: 'technology' },
    { name: 'Lifestyle', slug: 'lifestyle' },
    { name: 'Health', slug: 'health' },
    { name: 'Business', slug: 'business' }
];

const importData = async () => {
    try {
        await User.deleteMany();
        await Post.deleteMany();
        await Category.deleteMany();
        await Tag.deleteMany();

        const createdUsers = await User.create(users);
        const createdCategories = await Category.create(categories);

        const posts = [];
        for (let i = 1; i <= 30; i++) {
            posts.push({
                title: `Seed Post ${i}`,
                content: `This is the content for seed post number ${i}. It covers various topics in ${createdCategories[i % 4].name}.`,
                author: createdUsers[5 + (i % 5)]._id,
                categories: [createdCategories[i % 4]._id],
                status: i % 3 === 0 ? 'published' : (i % 3 === 1 ? 'submitted' : 'draft'),
                publishedAt: i % 3 === 0 ? Date.now() : null
            });
        }

        await Post.create(posts);

        console.log('Data Imported!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
}
