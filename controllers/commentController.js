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