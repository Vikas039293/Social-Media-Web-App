import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function explore() {
    const navigate=useNavigate();
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            const req= await fetch("http://localhost:4000/explore",{
                method:'GET',
                headers:{'Content-Type':'application/json'}
            })
            const data=await req.json();
            setUsers(data);
        }
        fetchData();
    },[]);
    function handleClick(username){
        navigate("/profile/"+username);
    }
  return (
    <div className="exploreContainer">
        <div className="exploreHeading">Explore People</div>
        {users.map((obj)=>{
            return (
                <div className="exploreUser" onClick={()=>handleClick(obj.username)}>
                    <img src={obj.profilePic} className='Avatar' alt=''/>
                    <div className="exploreUsername">{obj.username}</div>
                </div>
            )
        })}
    </div>
  )
}

export default explore;