const User = require('../models/users');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title : "PROFILE"
    })
}

//render signin page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()) return res.redirect('/users/profile');

    return res.render('signin', {
            title: "LOGIN"
        })
}

//render signup page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()) return res.redirect('/users/profile');

    return res.render('signup', {
            title: "SIGN UP"
        })
}

//create new user
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}).then((data)=>{
        if(!data){
            User.create(req.body).then(()=>{
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

//sign in and create session for a user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

//sign out the user and end the session
module.exports.endSession = function(req,res){
    res.clearCookie("userID");
    return res.redirect('/users/sign-in');
}