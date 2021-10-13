const User=require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            return;
        }
        return res.render('profile',{
            profile_user:user
        });

    });
}

module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err)console.log("**********Multer Error :",err);

                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');

            })

        }catch(err){
            req.flash('error',err);
            return;
        }
    }
    else{
        return res.status(401).send('Unauthorised');
    }
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile/'+req.user.id);
    }
    return res.render('user-sign-up');
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile/'+req.user.id);
    }
    return res.render('user-sign-in');
}

module.exports.create=function(req,res){
    //todo
   
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log("error occurred while finding user in sign up");
            return;
        }
        if(!user){
            User.create(req.body,function(err,newUser){
                if(err){
                    console.log("error occurred while creatin new user");
                    return;
                }
                console.log("*****",newUser);
                return res.redirect('/user/sign-in');
            });
        }
        else{
            res.redirect('back');
        }
    });
}

module.exports.createSession=function(req,res){
    req.flash('success','logged in successfully');
    res.redirect('/user/profile/'+req.user.id);
}

module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','you have logged out');
    return res.redirect('/');
}