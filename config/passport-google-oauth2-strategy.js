const passport=require("passport");
const googleStrategy=require("passport-google-oauth").OAuth2Strategy;
const crypto=require("crypto");
const User=require("../models/user");

passport.use(new googleStrategy({
    clientID: "842567579196-vnpl9b7mmdtqirej7jjas4gnia0h795n.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/user/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("error in google strategy passport:",err);
                return;
            }
            // console.log(profile);

            if(user)
            {
                return done(null,user);
            }else{
                User.create({
                    name: profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex")

                },function(err,user){
                    if(err){
                        console.log("error in google strategy passport:",err);
                        return;
                    }
                    else
                    return done(null,user);
                });
            }
        });
    }

));