const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = async function(req,res){
    let post = await Post.findById(req.body.post);

    let comment = await Comment.create({
        content : req.body.content,
        user : req.user._id,
        post : req.body.post
    })

    post.comments.push(comment);
    post.save();
    return res.redirect('/');
}

//delete comment
module.exports.destroy = async function(req,res){
    let comment = await Comment.findById(req.params.id);

    if(req.user.id == comment.user){
        let postId = comment.post;
        await Comment.deleteOne({_id : req.params.id});
        await Post.findByIdAndUpdate(postId, { $pull : { comments : req.params.id } });
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}