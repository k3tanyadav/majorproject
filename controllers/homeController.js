const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = function(req,res){
    Post.find({})
    .populate('user')
    .populate({path : 'comments', populate : {path : 'user'}})
    .then((data)=>{
        User.find({}).then((allUsers)=>{
            return res.render('home', {
                title : "HOME",
                posts : data,
                allUsers : allUsers
            })
        })
    })
}
