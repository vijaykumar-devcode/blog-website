const express = require('express');
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getCategories)
    .post(protect, authorize('super_admin', 'admin'), createCategory);

router.route('/:id')
    .get(getCategory)
    .put(protect, authorize('super_admin', 'admin'), updateCategory)
    .delete(protect, authorize('super_admin', 'admin'), deleteCategory);

module.exports = router;
