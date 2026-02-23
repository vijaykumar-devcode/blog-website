const express = require('express');
const { getStats, reviewPost, getUsers, updateUserRole } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('super_admin', 'admin', 'editor'));

router.get('/stats', getStats);
router.put('/review-post/:id', reviewPost);
router.get('/users', authorize('super_admin', 'admin'), getUsers);
router.put('/users/:id/role', authorize('super_admin'), updateUserRole);

module.exports = router;
