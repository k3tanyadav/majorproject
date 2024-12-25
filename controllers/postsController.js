const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/likes');

module.exports.create = async function(req,res){
    let post = await Post.create({
        content : req.body.content,
        user : req.user._id,
    });

    req.flash('success', 'new post created!');

    // if request is xhr(AJAX)
    if(req.xhr){
        let p = await post.populate('user','-password');//populate user excluding the password
        return res.status(200).json({
            post : p,
            message : "post created!"
        })
    }
    res.redirect('back');
}

//delete post
module.exports.destroy = async function(req,res){
    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){
        await Post.deleteOne({_id : post._id});
        await Like.deleteMany({likeable : req.params.id});
        for(c of post.comments){
            await Like.deleteMany({likeable : c});
        }
        await Comment.deleteMany({post : req.params.id});
        //flash message
        req.flash('success', 'post deleted!');

        //check if request is xhr(AJAX)
        if(req.xhr){
            return res.status(200).json({
                post_id : req.params.id,
                message : "post deleted!"
            })
        }
        return res.redirect('back');
    }
    else{
        req.flash('error', 'error deleting post!');
        return res.redirect('back');
    }
}