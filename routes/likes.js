const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/toggle', likeController.toggleLike);

module.exports = router;