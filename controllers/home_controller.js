const Post=require('../models/post');

module.exports.home=function(req,res){
    Post.find({}).populate('user').exec(function(err,posts){
        if(err){
            console.log("error occurred in finding the posts");
            return;
        }
        return res.render('home',{
            posts:posts
        });
    });
}