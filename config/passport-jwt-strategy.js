const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//since we're authenticating token for a USER
const User = require('../models/users');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'something'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id).then((user)=>{
        if(user){
            return done(null, user);
        }
        return done(null, false);
    })
}))

module.exports = passport;