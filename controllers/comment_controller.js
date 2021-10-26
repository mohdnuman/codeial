const { modelNames } = require('mongoose');
const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require("../mailers/comments_mailer");

module.exports.create=async function(req,res){
    try{
        let post=await Post.findById(req.body.post);
        if(post){
        let comment=await Comment.create({
                    content:req.body.content,
                    user:req.user._id,
                    post:req.body.post
        });
        comment=await comment.populate('user','name email');
        post.comments.push(comment);
        post.save();

        commentsMailer.newComment(comment);

        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment
                },
                message:"comment created!"
            })
        }

        return res.redirect('/');
        }

    }catch(err){
        console.log("errorr occurred:",err);
        return;
    }
    
}

module.exports.destroy=async function(req,res){
  try{
        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id)
        {
            let postid=comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postid, {$pull:{comments:req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"comment deleted!"
                })
            }

            return res.redirect('back');
            
        }else{
                return res.redirect('back');
        }

  }catch(err){
      console.log("error occurred:",err);
      return;
  }

}