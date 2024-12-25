const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = async function(req,res){
    let posts = await Post.find({}).sort('-createdAt').populate('user').populate({path : 'comments', populate : {path : 'user'}})

    let allUsers = await User.find({});
    let currentUser;

    if(req.isAuthenticated()){
        // populate all the friends of signed-in user
        currentUser = await User.findById(req.user.id).populate({path : 'friends', populate : {path:'from_user to_user'}});
    }

    return res.render('home', {
        title : "HOME",
        posts : posts,
        allUsers : allUsers,
        currentUser : currentUser
    })
}
