const express = require('express');
const {
    updateProfile,
    getAuthorProfile,
    followUser,
    getNotifications,
    markNotificationsRead
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/profile/:id', getAuthorProfile);

router.use(protect);

router.put('/profile', updateProfile);
router.post('/follow/:id', followUser);
router.get('/notifications', getNotifications);
router.put('/notifications/read', markNotificationsRead);

module.exports = router;
