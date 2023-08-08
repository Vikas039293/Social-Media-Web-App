import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { UserContext } from "../Context/userContext";

function About(){
    const [caption,setCaption]=useState('');
    const [file,setFile]=useState('');
    const {userInfo}=useContext(UserContext);
    const navigate=useNavigate();
    const [preViewFile,setPreViewFile]=useState('');
    const [fileType,setFileType]=useState('');
    async function PostFile(ev){
        ev.preventDefault();
        const data={
            username:userInfo.username,
            caption:caption,
            file:file,
            fileType:fileType.startsWith('image/')?"image":"video",
        };
        const response = await fetch("http://localhost:4000/compose",{
            method:'POST',
            body: JSON.stringify({data}),
            headers:{'Content-Type':'application/json'}
        });
        if(!response.ok){
            console.log(response);
        }
        else{
            navigate("/");
        }
    }
    const handleFileUpload=(event)=>{
        const file=event.target.files[0];
        if(file){
            setFileType(file.type);
            const reader= new FileReader();
            reader.onloadend=()=>{
                setFile(reader.result);
                setPreViewFile(reader.result);
            }
            reader.readAsDataURL(file);
        }
        console.log(fileType);
    }
    return (
        <form  method="post" class="form-group" onSubmit={PostFile}>
            <div className="form-group">
                <label for="upload" className="required">
                    <span
                      class="btn btn-info"
                      aria-hidden="true"
                    >Upload Image/Video</span>
                    <input type="file" id="upload" style={{ display:"none" }} onChange={handleFileUpload} alt=""/>
                  </label>
                {fileType.startsWith('image/')?(
                    <img src={preViewFile} style={{maxHeight:'500px',maxWidth:'400px'}} alt=""/>
                ):(
                    <video src={preViewFile} autoPlay style={{maxHeight:'500px',maxWidth:'400px'}}/>
                )}
                <br/>
                <label for="caption" >Caption (maxLength:100 chars)</label>
                <input type="text" name="caption" id="caption" class="form-control" maxLength="100" value={caption} onChange={ev => setCaption(ev.target.value)} required/>
            </div>
            <button type="submit" class="btn btn-primary">Post</button>
        </form>
    );
}
export default About;
