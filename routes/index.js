const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/',homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api', require('./api'));
router.use('/likes', require('./likes'));
router.use('/friends', require('./friends'));

module.exports = router;