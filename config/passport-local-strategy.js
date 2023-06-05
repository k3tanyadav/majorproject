const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true
    },
    function(req, email, password, done){
        User.findOne({email : email}).then((user)=>{
            if(!user) {
                req.flash('error', 'could not find user'); 
                return done(null,false);
            }
            if(user.password != password) {
                req.flash('error', 'Invalid username/password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

//serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    return done(null, user.id);
})

//deserailize the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then((user)=>{
        return done(null, user);
    })
})

//check if the user is Authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

//set the user in locals for views if authenticated
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;