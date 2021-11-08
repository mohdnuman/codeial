const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const extractJWT=require('passport-jwt').ExtractJwt;
const env=require('./environment');

const User=require('../models/user');

let opts={
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret //to decrypt
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err)
        {
            console.log("errorr in finding user from jwt");
            return;
        }
        if(user)
            return done(null,user);
        else{
            return done(null,false);
        }
    })
}));

module.exports=passport;