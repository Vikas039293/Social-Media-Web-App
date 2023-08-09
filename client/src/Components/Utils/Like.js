import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { grey, red } from "@mui/material/colors";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import List from "./List";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function IconCheckboxes(props) {
  const {userInfo} =React.useContext(UserContext);
  const [showLikes,setshowLikes]=React.useState(false);
  const [likes,setLikes]=React.useState(props.likes);
  const [checked, setChecked] = React.useState(userInfo.username?(props.likes.includes(userInfo.username)):false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    if(!userInfo.username){
      navigate("/login");
      return;
    }
    setChecked(event.target.checked);
    fetchReq();
  };
  async function fetchReq(){
    if(userInfo.username){
      const req= await fetch("https://social-web-83ud.onrender.com/like",{
      method:'POST',
      body: JSON.stringify({like:!checked,user:props.username,postId:props.id}),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
      const dataRecieved= await req.json();
      setLikes(dataRecieved);
    }
  }
  function handleClick(){
    
    setshowLikes(!showLikes);
  }
  return (
    <div>
      <Checkbox
        {...label}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        sx={{
          color: grey[800],
          "& .MuiSvgIcon-root": {
            fontSize: 28,
            color: red[500],
          },
        }}
        checked={checked}
        onChange={handleChange}
      />
      
      <span onClick={handleClick} style={{cursor:'pointer'}}>{likes.length} Likes</span>
      {showLikes && <List list={likes} key={likes.length} show={setshowLikes}/>}
    </div>
  );
}
