const Post = require('../../../models/posts');

module.exports.index = async function(req,res){
    let posts = await Post.find({}).populate('user','-password').populate({path : 'comments', populate : {path : 'user'}});

    return res.status(200).json({
        message : "all posts",
        posts : posts
    });
}