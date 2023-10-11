const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const passport = require('passport');
const login = (req, res, next) => {
    const remember=req.body.remember;
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id,username:user.username }, secret,{expiresIn:remember?'2 days':'2h'});
        res.json({token:token,username:user.username,userId:user.id});
        // ,{httpOnly:true,maxAge: remember?(60*60*2):(60*60*24*2)}
    })(req, res, next);
};

module.exports = login; 
