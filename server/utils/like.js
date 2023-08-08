const jwt = require("jsonwebtoken");
const Profile= require("../DataBase/UserData");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const Like=async (req,res)=>{
    const {like,user,postId}=req.body;
    const token= req.cookies.token;
    //console.log(req.cookies);
    const decoded= jwt.verify(token,secret);
    // console.log(like+" "+user+" "+postId);
    if(like){
        const flag= await Profile.findOneAndUpdate({username:user,'post._id':postId},{$addToSet:{'post.$.like':decoded.username}});
    }
    else{
        const flag= await Profile.findOneAndUpdate({username:user,'post._id':postId},{$pull:{'post.$.like':decoded.username}});
    }
    const flag=await Profile.findOne({username:user,'post._id':postId});
    const post = flag.post.find((p) => p._id.toString() === postId);
    // console.log(post.like);
    res.json(post.like);
    //console.log(flag.post[0].like);
};
module.exports=Like;