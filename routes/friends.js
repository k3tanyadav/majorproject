const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');
const passport = require('passport');

router.get('/toggle/:id', passport.checkAuthentication ,friendsController.toggleFriend);

module.exports = router;