const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');

const User = require('../models/users');

// use passport-google-strategy to authenticate user via google
passport.use(new googleStrategy({
        clientID : env.google_client_id,
        clientSecret : env.google_client_secret,
        callbackURL : env.google_client_callback_url
    }, 
    function(accessToken, refreshToken, profile, done){
        User.findOne({email : profile.emails[0].value}).then((user)=>{
            if(user){
                // if user exists set req.user as user
                return done(null, user);
            }
            // if user does not exist, create user and set req.user as user
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            }).then((user)=>{
                return done(null, user);
            })
        })
}))