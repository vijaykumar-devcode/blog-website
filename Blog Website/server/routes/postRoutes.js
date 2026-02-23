const express = require('express');
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    toggleBookmark,
    getMyPosts
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getPosts);
router.get('/slug/:slug', getPost);

router.use(protect);

router.get('/my-posts', getMyPosts);
router.post('/', createPost);
router.route('/:id')
    .put(updatePost)
    .delete(deletePost);

router.post('/:id/like', toggleLike);
router.post('/:id/bookmark', toggleBookmark);

module.exports = router;
