const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    // id of the object that was liked (could be a post or a comment)
    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        refPath : 'onModel',
        required : true
    },
    // type of the object that was liked (could be a post or a comment)
    onModel : {
        type : String,
        enum : ['Post', 'Comment'],
        required : true,
    }
}, {timestamps : true})

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;