const mongoose=require('mongoose');

const friendshipSchema=new mongoose.Schema({
    from_user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    to_user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

},{
    timestamps:true
});

const Frienship=mongoose.model('Frienship',friendshipSchema);
module.exports=Frienship;