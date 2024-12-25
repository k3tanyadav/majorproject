const Friend = require('../models/friends');
const User = require('../models/users');

module.exports.toggleFriend = async function(req,res){
    let friendId = req.params.id;
    let userId = req.user.id;

    let friendRemoved = true;

    //get both the users
    let user1 = await User.findById(userId);
    let user2 = await User.findById(friendId);

    //check if friendship exists
    let friendshipCheck1 = await Friend.findOne({from_user : userId, to_user : friendId});
    let friendshipCheck2 = await Friend.findOne({from_user : friendId, to_user : userId});

    // if friendship exists, remove it
    if(friendshipCheck1){
        await Friend.deleteOne({from_user : userId, to_user : friendId});
        user1.friends.pull(friendshipCheck1._id); user1.save();
        user2.friends.pull(friendshipCheck1._id); user2.save();
    }
    else if(friendshipCheck2){
        await Friend.deleteOne({from_user : friendId, to_user : userId});
        user1.friends.pull(friendshipCheck2._id); user1.save();
        user2.friends.pull(friendshipCheck2._id); user2.save();
    }
    // if friendship DNE, create one
    else{
        let newFriendship = await Friend.create({
            from_user : userId,
            to_user : friendId
        })
        user1.friends.push(newFriendship); user1.save();
        user2.friends.push(newFriendship); user2.save();
        friendRemoved = false;
    }

    //send data back to AJAX request
    return res.status(200).json({
        message : `friendship between ${user1.name} & ${user2.name} toggled!`,
        friendRemoved : friendRemoved
    })
}