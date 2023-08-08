const Profile= require('../DataBase/UserData');
const bcrypt= require("bcrypt");
require("dotenv").config();
const saltRounds=Number(process.env.SALT_ROUNDS);
const Register= async (req,res)=>{
    const {username,password,name} = req.body;
    const UserExist= await Profile.findOne({username:username});
    if(UserExist){
        res.status(401).json('Username Already Exist!!');
        return;
    }
    try {
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            const newProfile= new Profile({
                username:username,
                password:hash,
                name:name
            });
            await newProfile.save();
        });
        res.json("User Data Recieved");
    } catch (error) {
        res.status(401).json("Error while saving User Data");
    }
    
}
module.exports=Register;