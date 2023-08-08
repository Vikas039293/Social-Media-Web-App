const Profile= require("../DataBase/UserData");

const Avatar=async(req,res)=>{
    const user=req.params.title;
    const flag=await Profile.findOne({username:user});
    if(flag){
        res.json(flag.profilePic);
        return;
    }

    res.status(401).json("Error While Fetching Avatar");
}
module.exports=Avatar;