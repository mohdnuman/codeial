const Post=require('../models/post');
const User=require('../models/user');

module.exports.home=function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{path:'user'}
    })
    .exec(function(err,posts){
        if(err){
            console.log("error occurred in finding the posts");
            return;
        }
        User.find({},function(err,users){
            if(err){
                return;
            }
            return res.render('home',{
                posts:posts,
                all_users:users
            });

        })
      
    });
}