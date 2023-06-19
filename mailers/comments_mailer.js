const nodeMailer = require('../config/nodemailer');

// different way to export
exports.newComment = (comment)=>{
    console.log('new comment in console', comment);

    let htmlString = nodeMailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs');
    
    nodeMailer.transporter.sendMail({
        from : 'ketany798@gmail.com',
        to : comment.user.email,
        subject : 'NEW COMMENT',
        html : htmlString
    }, (err, info)=>{
        if(err ){console.log('error in sending mail', err); return;}
        console.log('mail sent!', info);
    })
}