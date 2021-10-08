const User=require('../models/user');

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

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
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