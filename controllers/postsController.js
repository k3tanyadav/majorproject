const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function(req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id,
    }).then(()=>{
        //flash message
        req.flash('success', 'new post created!');
        res.redirect('back');
    })
}

//delete post
module.exports.destroy = async function(req,res){
    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
        await Post.deleteOne({_id : post._id});
        await Comment.deleteMany({post : req.params.id});
        //flash message
        req.flash('success', 'post deleted!');
        return res.redirect('back');
    }
    else{
        req.flash('error', 'error deleting post!');
        return res.redirect('back');
    }
}