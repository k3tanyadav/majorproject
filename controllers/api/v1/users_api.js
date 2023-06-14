const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try {
        let user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message : "Invalid username or password!"
            });
        }

        // if user is found create and send the token
        return res.status(200).json({
            message : "here's your token. keep it safe!",
            data : {
                token : jwt.sign(user.toJSON(), 'something', {expiresIn : '10000'}) //create token
            }
        })
    } catch (error) {
        console.log('***********', error);
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}