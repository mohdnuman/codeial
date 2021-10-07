const { modelNames } = require('mongoose');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log('error find post');
            return;
        }
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },function(err,comment){
                if(err){
                    console.log("error creating comment");
                    return;
                }
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    })
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            console.log("error occurred while finding comment to delete");
            return;
        }
        if(comment.user==req.user.id)
        {
            let postid=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postid, {$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })

}