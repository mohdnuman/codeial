const nodemailer = require("../config/nodemailer");
const nodeMailer=require("../config/nodemailer");

exports.newComment=(comment)=>{

    console.log("newComment mailer inside");
    let htmlString=nodemailer.renderTemplate({comment:comment},'comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:"mohammadnuman123@gmail.com",
        to:comment.user.email,
        subject:"new comment published!",
        // html:'<h1>your new comment is added</h1>',
        html:htmlString,
    },
    (err,info)=>{
        if(err){
            console.log("errror occurred:",err);
            return;
        }
        console.log("message sent :",info);
        return;
    });
}