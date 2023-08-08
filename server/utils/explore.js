const Profile=require('../DataBase/UserData');

const Explore=async (req,res)=>{
    const Users=await Profile.find({},{username:1,profilePic:1});
    res.json(Users);
}

module.exports=Explore;