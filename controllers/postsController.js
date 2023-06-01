const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function(req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id,
    }).then(()=>{
        res.redirect('back');
    })
}

//delete post
module.exports.destroy = function(req,res){
    Post.findById(req.params.id).then((post)=>{
        if(post.user == req.user.id){
            Post.deleteOne({_id : post._id}).then(()=>{
                Comment.deleteMany({post : req.params.id}).then(()=>{
                    return res.redirect('back');
                });
            });
        }
        else{
            return res.redirect('back');
        }
    })
}