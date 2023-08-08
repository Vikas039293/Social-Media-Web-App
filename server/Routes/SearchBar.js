const Profile =require ("../DataBase/UserData");
const SearchBar=async (req,res)=>{
    const user= await Profile.find({},{"username.$":1});
    if(user){
        res.json(user);
    }
    else{
        res.json();
    }
};

module.exports=SearchBar;