const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index = async function(req,res){
    let posts = await Post.find({}).populate('user','-password').populate({path : 'comments', populate : {path : 'user'}});

    return res.status(200).json({
        message : "all posts",
        posts : posts
    });
}

module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            await Post.deleteOne({_id : post._id});
            await Comment.deleteMany({post : req.params.id});

            return res.status(200).json({
                message : "post and associated comments deleted!"
            })
        }
        else{
            return res.status(401).json({
                message : "you cannot delete this post!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error!"
        })
    }
}