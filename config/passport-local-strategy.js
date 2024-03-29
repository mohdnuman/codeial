const passport=require("passport");
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
  },
  function(req,email,password,done){
      User.findOne({email:email},function(err,user){
          if(err){
              req.flash('error',err);
            //   console.log("error occured while finding user --->passporrt");
              return done(err);
          }
          if(!user || user.password!=password){
              req.flash('error','Invalid Username/Password');
            //   console.log("invalid username/password");
              return done(null,false);
          }
          return done(null,user);
      });
  }
));


//serializing
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializing
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error occured in deserializing user ---->passport");
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;