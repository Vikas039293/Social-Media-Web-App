const Profile= require("../DataBase/UserData");
const cloudinary = require('cloudinary').v2;
require("dotenv").config();
const shortid = require('shortid');
const uniqueId = shortid.generate();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
  });
const compose=async (req,res)=>{
    const {username,file,fileType,caption}=req.body.data;
    const imageId=username+"_"+uniqueId;
    const fileUrl=fileType==='image'?(
            await cloudinary.uploader.upload(file,
            {public_id: imageId})
        ):(
            await cloudinary.uploader.upload(file,
            {resource_type:fileType, public_id: imageId})
        );

    const update={
        username:username,
        file:fileUrl.secure_url,
        fileType:fileType,
        caption:caption,
    };
    // console.log(update);

    const flag= await Profile.findOne({username:username});
    flag.post.push(update);
    await flag.save();
    //console.log(flag);
    res.json("Post Recieved");
};

module.exports= compose;