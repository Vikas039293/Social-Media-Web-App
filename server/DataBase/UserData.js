const mongoose = require("mongoose");
require("dotenv").config();
// async function success(){
//   const succes =await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });
//   if(!succes){
//     console.log(succes);
//   }
//   // console.log(succes);
// }
// success();
const success = mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });
// if(!success){
//   console.log(success);
// }
// console.log(success);
const postSchema = new mongoose.Schema(
  { 
    username:{type:String, required:true},
    file:{type:String,required:true},
    fileType:{type:String,required:true},
    caption:{type:String},
    like: { type: [String], default: [] },
  },
  { timestamps: true }
);

const SocialSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profilePic: { type: String ,default:"https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"},
  followers: { type: [String], default: [] },
  following: { type: [String], default: [] },
  post:[postSchema],
});
const Profile = mongoose.model("Profile", SocialSchema);

module.exports = Profile;
