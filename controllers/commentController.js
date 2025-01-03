const Comment = require('../models/comments');
const Post = require('../models/posts');
const Like = require('../models/likes');
const commentsMialer = require('../mailers/comments_mailer');

module.exports.create = async function(req,res){
    let post = await Post.findById(req.body.post);

    let comment = await Comment.create({
        content : req.body.content,
        user : req.user._id,
        post : req.body.post
    })

    post.comments.push(comment);
    post.save();
    //flash message
    req.flash('success', 'comment added!');
    //check if xhr request(AJAX)
    if(req.xhr){
        let comment_ = await comment.populate('user','-password');
        commentsMialer.newComment(comment_); // send mail to commenter
        return res.status(200).json({
            comment : comment_,
            message : "comment added!"
        })
    }
    return res.redirect('/');
}

//delete comment
module.exports.destroy = async function(req,res){
    let comment = await Comment.findById(req.params.id);

    if(req.user.id == comment.user){
        let postId = comment.post;
        await Comment.deleteOne({_id : req.params.id});
        await Post.findByIdAndUpdate(postId, { $pull : { comments : req.params.id } });
        await Like.deleteMany({likeable : req.params.id});
        //flash message
        req.flash('success', 'comment deleted!');
        //if req is xhr(AJAX)
        if(req.xhr){
            return res.status(200).json({
                comment_id : req.params.id,
                message : "comment deleted"
            })
        }
        return res.redirect('back');
    }
    else{
        //flash message
        req.flash('error', 'error deleting comment!');
        return res.redirect('back');
    }
}