const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/users');

// use passport-google-strategy to authenticate user via google
passport.use(new googleStrategy({
        clientID : '230117372210-uvch37di5kr5beo67ufqlr1kli11qoqh.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/users/auth/google/callback'
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