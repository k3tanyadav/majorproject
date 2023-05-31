const Post = require('../models/posts');

module.exports.home = function(req,res){
    Post.find({})
    .populate('user')
    .populate({path : 'comments', populate : {path : 'user'}})
    .then((data)=>{
        return res.render('home', {
            title : "HOME",
            posts : data
        })
    })
}
