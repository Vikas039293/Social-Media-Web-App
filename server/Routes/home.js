const Profile =require ("../DataBase/UserData");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const home=async (req,res)=>{
    const token = req.header('Authorization').split(' ')[1];
    // console.log(token);
    const decoded=jwt.verify(token,secret);
    const usersArray= await Profile.find();
    const followerPosts = usersArray
    .filter(user => user.username === decoded.username) // Filter the user whose username matches the targetUsername
    .flatMap(user => user.following) // Extract the followers array from the user object
    .map(following => usersArray.find(user => user.username === following)) // Find the user objects corresponding to the followers
    .flatMap(user => user.post); // Extract the posts array from the user objects
    if(usersArray){
        res.json(followerPosts);
    }
    else{
        res.status(401).json("not user found");
    }
};

module.exports=home;