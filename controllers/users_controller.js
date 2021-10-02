const User=require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
            User.findOne({id: req.cookies.id},function(err,user){
                if(err){
                    console.log("error occured fetchin user in profile");
                    return;
                }
                if(user){
                       return res.render("profile",{
                           title:"user profile",
                           user:user
                       });

                }
                else {
                    return res.redirect('/user/sign-in')
                }
            })
    }
    else{
        return res.redirect('/user/sign-in');
    }
}

module.exports.signup=function(req,res){
    return res.render('user-sign-up');
}

module.exports.signin=function(req,res){
    return res.render('user-sign-in');
}

//sign up
module.exports.create=function(req,res){

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

//sign in
module.exports.createSession=function(req,res){
    
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("error occurred in finding user in sign in");
            return;
        }
        console.log(user);
        if(user){
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

            res.cookie('user_id',user.id);
            return res.redirect('/user/profile');

        }
        else{
            return res.redirect('back');
        }
    });
}

//signout
module.exports.signout=function(req,res){
    if(req.cookies.user_id){
        res.cookie('user_id',"");
        res.redirect('/user/sign-in');

    }
    else{
        res.redirect('/user/sign-in')
    }
}
