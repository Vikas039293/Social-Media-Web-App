const jwt = require("jsonwebtoken");
const Profile= require("../DataBase/UserData");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const Like=async (req,res)=>{
    const {like,user,postId}=req.body;
    token=req.header('Authorization').split(' ')[1];
    const decoded= jwt.verify(token,secret);
    if(like){
        const flag= await Profile.findOneAndUpdate({username:user,'post._id':postId},{$addToSet:{'post.$.like':decoded.username}});
    }
    else{
        const flag= await Profile.findOneAndUpdate({username:user,'post._id':postId},{$pull:{'post.$.like':decoded.username}});
    }
    const flag=await Profile.findOne({username:user,'post._id':postId});
    const post = flag.post.find((p) => p._id.toString() === postId);
    res.json(post.like);
};
module.exports=Like;