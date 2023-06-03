const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const passport = require('passport');


router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
),usersController.createSession);
router.post('/update/:id', passport.checkAuthentication, usersController.update)
router.get('/sign-out',usersController.endSession);

module.exports = router;