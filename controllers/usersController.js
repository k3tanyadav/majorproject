const User = require('../models/users');

module.exports.profile = function(req,res){
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile',{
            title : "PROFILE",
            userProfile : user
        })
    })
}

//render signin page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()) return res.redirect(`/users/profile/${req.user.id}`);

    return res.render('signin', {
            title: "LOGIN"
        })
}

//render signup page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()) return res.redirect(`/users/profile/${req.user.id}`);

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

//update user info
module.exports.update = function(req,res){
    if(req.params.id == req.user.id){
        User.findByIdAndUpdate(req.params.id, req.body).then(()=>{
            return res.redirect('back');
        })
    }
    else return res.redirect('back');
}

//sign in and create session for a user
module.exports.createSession = function(req,res){
    req.flash('success', 'logged in successfully!')
    return res.redirect('/');
}

//sign out the user and end the session
module.exports.endSession = function(req,res){
    req.logout(()=>{
        req.flash('success', 'logged out!');
        return res.redirect('/users/sign-in');
    });
}