const express = require("express");
const cors= require("cors");
const bodyParser=require('body-parser');
const passport=require('./Authentication/auth');
const login=require('./Authentication/login');
const verifyToken=require('./Middleware/auth');
const cookieParser=require("cookie-parser");
const Register= require('./Authentication/register');
const Compose=require('./Routes/compose');
const Home = require("./Routes/home");
const SearchBar=require("./Routes/SearchBar");
const ProfilePage=require('./Routes/profilePage');
const Follow= require('./utils/follow');
const uploadImg = require("./utils/uploadImg");
const Like = require("./utils/like");
const Avatar= require("./utils/Avatar");
const Explore=require("./utils/explore");
require("dotenv").config();
const app= express();
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
       



app.post("/compose",Compose);
app.post("/like",Like);
app.get("/",function(req,res){
    res.json("hello");
})
app.get("/avatar/:title",Avatar);
app.get('/protected',verifyToken,(req, res) => {
    //res.json(req.cookies);
});
app.get("/posts",Home);
app.post("/register",Register);

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
});
app.get("/explore",Explore);
app.get("/search",SearchBar);
app.get("/profile/:title",ProfilePage);
app.get("/follow/:title",verifyToken,Follow);
app.post("/uploadImg",uploadImg);
app.post('/login',login);
app.listen(Number(process.env.PORT_NUMBER),function(){
    console.log("server started at port number "+process.env.PORT_NUMBER);
});
