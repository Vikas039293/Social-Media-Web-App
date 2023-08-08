const Profile= require("../DataBase/UserData");
const ProfilePage=async (req,res)=>{
    const username=req.params.title;
    const user= await Profile.findOne({username:username});
    if(user){
        return res.json(user);
    }
    return res.status(401).json("No user Found with userId "+username);
}

module.exports=ProfilePage;