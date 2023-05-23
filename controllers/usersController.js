module.exports.profile = function(req,res){
    res.send('<h4 style="background:red";>welcome to profile page</h4>');
}

//user signin controller
module.exports.signIn = function(req,res){
    res.render('signin', {
        title: "LOGIN"
    })
}

//user signup controller
module.exports.signUp = function(req,res){
    res.render('signup', {
        title: "SIGN UP"
    })
}