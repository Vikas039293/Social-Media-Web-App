import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Avatar(props){
  const token=localStorage.getItem("token");
  const navigate=useNavigate();
  const [imgUrl,setImgUrl]=useState("https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png");
  useEffect(()=>{
    async function fetchData(){
      try {
        const res = await fetch("https://social-web-83ud.onrender.com/avatar/" + props.username, {
        method: "GET",
        headers:{
          'Content-Type':'application/json',
          Authorization:'Bearer '+token,
        },
        credentials: "include",
      });
      const data= await res.json();
        if(res.ok && data){
          setImgUrl(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[]);
  function handleClick(){
    navigate("/profile/"+props.username);
  }
  return (
    <span style={{cursor:'pointer',borderRadius:'50%'}} onClick={handleClick}>
      <img src={imgUrl} alt="" style={{height:'40px',width:'40px',borderRadius:'50%',padding:'5px'}} />
    </span>
  );
}

export default Avatar;