const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});

        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"internal username or password!"
            });
        }
        return res.json(200,{
            message:"sign in successful! here is your token. please keep it safe!",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'}) //'codeial' is the secret ke to encrypt user
            }

        })


    }catch(error){
        console.log("error occurred:",error);
        return res.json(500,{
            message:"internal server error!"
        });
    }
}