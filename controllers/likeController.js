const Like = require('../models/likes');
const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.toggleLike = async function(req,res){
    let likeableType = req.query.type;
    let likeable;
    let removedLike = false;

    if(likeableType == 'Post'){
        likeable = await Post.findById(req.query.id); 
    }
    else{
        likeable = await Comment.findById(req.query.id);
    }

    // does the like already exist
    let existingLike = await Like.findOne({
        user : req.user._id,
        likeable : req.query.id,
        onModel : req.query.type
    })

    // if the like already exists, remove its id from the post/comment array and delete like from db
    if(existingLike){
        likeable.likes.pull(existingLike._id);
        likeable.save();
        await Like.deleteOne({_id : existingLike._id});
        removedLike = true;
    }
    // otherwise create a new like in db and add its id to the relevant post/comment
    else{
        let newLike = await Like.create({
            user : req.user._id,
            likeable : req.query.id,
            onModel : req.query.type
        })

        likeable.likes.push(newLike);
        likeable.save();
    }

    // sending data back to the ajax request
    return res.status(200).json({
        message : `like toggled on ${req.query.type}`,
        removedLike : removedLike
    })
}