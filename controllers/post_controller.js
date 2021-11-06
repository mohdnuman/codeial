const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like')
const { authenticate } = require('passport');

module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        post = await post.populate('user','name');

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"post created!"
            })
        }

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
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});


            post.remove();
            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"post deleted!"
                })
            }
            
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