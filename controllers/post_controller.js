const Post=require('../models/post');
const Comment=require('../models/comment');
const { authenticate } = require('passport');

module.exports.create=async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        req.flash('success',"Post Published");
        return res.redirect('back');
    }catch(err){
        // console.log("error:",err);
        req.flash('error',err);
        return;
    }
   
}

module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            
            req.flash("success","Post deleted with associated comments");
            return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }
    catch(err){
        // console.log("error occurred:",err);
        req.flash("error",err);
        return;
    }
}