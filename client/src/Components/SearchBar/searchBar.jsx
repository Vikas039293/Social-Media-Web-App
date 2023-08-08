import React, { useEffect, useState } from "react";
import './searchBar.css';
const searchBar=({placehoder})=>{
    const [userdata,setUserData]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await fetch("http://localhost:4000/search",{
                    method:'GET',
                    headers:{'Content-Type':'application/json'},
                    credentials:'include',
                });
                const data = await req.json();
                setUserData(data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
        
    },[]);
    const [filteredData,setFilteredData]=useState([]);
    const [wordEntered,setWordEntered]=useState("");
    function handleFilter(event){
        const searchWord=event.target.value;
        setWordEntered(searchWord);

        const newFilter = userdata.filter((value) => {
            return value.username.toLowerCase().includes(wordEntered.toLowerCase());
        });
        if(searchWord===""){
            setFilteredData([]);
        }
        else{
            setFilteredData(newFilter);
        }
    };
    return(
        <>

        <form className="form-inline my-2 my-lg-0">
        <div className="SearchContainer">
            <div className="searchBar" >
                <input type="search" name="seachBar" placeholder={placehoder} onChange={handleFilter} value={wordEntered}/>
            </div>
            <div>
                {filteredData.length!==0 && (
                    <div className="results">
                        {filteredData.slice(0,15).map((value,key)=>{
                            return (
                                <div className="result">
                                    <a href={"/profile/"+value.username}>
                                        <p>{value.username}</p>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
        </form>
        </>
    );
}

export default searchBar;