const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided'});
    }
    else{
        try{
            jwt.verify(token,secret,{},(err,info)=>{
                res.json(info);
            });
            next();
        }
        catch(err){
            res.status(400).json('Invalid Token');
        }
    }
    
};

module.exports = verifyToken;
