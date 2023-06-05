const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = async function(req,res){
    let posts = await Post.find({}).populate('user').populate({path : 'comments', populate : {path : 'user'}})

    let allUsers = await User.find({});

    return res.render('home', {
        title : "HOME",
        posts : posts,
        allUsers : allUsers
    })
}
