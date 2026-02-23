const express = require('express');
const { createComment, updateComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', createComment);
router.route('/:id')
    .put(updateComment)
    .delete(deleteComment);

module.exports = router;
