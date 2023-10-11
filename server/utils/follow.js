const Profile = require("../DataBase/UserData");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const follow = async (req, res) => {
  try {
    const user = req.params.title;
    token=req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, secret);

    const userDoc = await Profile.findOne({ username: user });

    const isUserPresent = userDoc.followers.some(obj => obj=== decoded.username);
    if (isUserPresent) {
        await Profile.findOneAndUpdate({ username: user }, { $pull: { followers: decoded.username } });
        await Profile.findOneAndUpdate({ username: decoded.username }, { $pull: { following: user } });
    } else {
        await Profile.findOneAndUpdate({ username: user }, { $push: { followers: decoded.username } });
        await Profile.findOneAndUpdate({ username: decoded.username }, { $push: { following: user } });
    }

    
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

module.exports = follow;
