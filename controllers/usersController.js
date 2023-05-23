const User = require('../models/users');

module.exports.profile = function(req,res){
    let id = req.cookies.userID;
    if(id){
        User.findById(id).then((data)=>{
            if(data){
                return res.render('user_profile',{
                    title:"PROFILE",
                    user : data
                })
            }
            return res.redirect('/users/sign-in');
        })
    }
    else{
        return res.redirect('/users/sign-in');
    }
}

//render signin page
module.exports.signIn = function(req,res){
    res.render('signin', {
        title: "LOGIN"
    })
}

//render signup page
module.exports.signUp = function(req,res){
    res.render('signup', {
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

    User.findOne({email : req.body.email}).then((data)=>{
        if(!data){
            return res.redirect('/users/sign-up');
        }
        else{
            if(data.password != req.body.password)
                return res.redirect('back');

            res.cookie('userID',data._id);    
            return res.redirect('/users/profile');    
        }
    })
}

//sign out the user and end the session
module.exports.endSession = function(req,res){
    res.clearCookie("userID");
    return res.redirect('/users/sign-in');
}