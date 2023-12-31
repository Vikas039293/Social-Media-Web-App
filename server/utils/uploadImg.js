const Profile = require('../DataBase/UserData');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const cloudinary = require('cloudinary').v2;
const shortid = require('shortid');
const uniqueId = shortid.generate();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
  });

const uploadImg=async (req,res)=>{
    try {
        token=req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, secret);
        const base64Image=req.body.image;
        const image_id=decoded.username+uniqueId;
        const imgUrl=await cloudinary.uploader.upload(base64Image,
            { public_id: image_id},(err)=> {console.log(err)});
        //  console.log(imgUrl.secure_url);
        const update= await Profile.findOneAndUpdate({username:decoded.username},{profilePic:imgUrl.secure_url});

        res.status(201).json("Profile Pic Updated");
      } catch (error) {
        console.error("Error occurred:", error);
        res.status(401).json("Error while Uploading");
      }
}

module.exports=uploadImg;