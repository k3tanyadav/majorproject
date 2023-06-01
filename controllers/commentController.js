const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req,res){
    Post.findById(req.body.post).then((post)=>{
        Comment.create({
            content : req.body.content,
            user : req.user._id,
            post : req.body.post
        }).then((comment)=>{
            post.comments.push(comment);
            post.save();
            return res.redirect('/');
        })
    })
}

//delete comment
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id).then((comment)=>{
        if(req.user.id == comment.user){
            let postId = comment.post;
            Comment.deleteOne({_id : req.params.id}).then(()=>{
                Post.findByIdAndUpdate(postId, { $pull : { comments : req.params.id } }).then(()=>{
                    return res.redirect('back');
                });
            });
        }
        else{
            return res.redirect('back');
        }
    });
}