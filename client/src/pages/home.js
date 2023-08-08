import React, { useContext } from "react";
import { useState,useEffect } from "react";
import { UserContext } from "../Context/userContext";
import UserPost from '../Components/Post';
import Explore from "../Components/explore";
import LandingPage from "../Components/landing page/landingPage";
function Home(){
    const [Posts,setPosts]= useState([]);
    const {userInfo}=useContext(UserContext);
    const username=userInfo?userInfo.username:null;
    useEffect(() => {
        if(!username){
            return;
        }
        const fetchData = async () => {
            try {
                const req = await fetch("http://localhost:4000/posts",{
                    method:'GET',
                    headers:{'Content-Type':'application/json'},
                    credentials:'include',
                });
                
                const data = await req.json();
                if (data && Array.isArray(data)) {
                    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }
                setPosts(data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
        
    },[userInfo]);
    const logged = userInfo?userInfo.username? true : false:false;
    return (
        <div>
            {logged
                ?
                <div className="homePage">
                    <Explore/>
                    <UserPost Post={Posts}/>
                </div>
                :
                <LandingPage/>
            }
            
        </div>
    );
}
export default Home;