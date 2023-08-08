import * as React from "react";
import Like from "./Utils/Like";
import Avatar from "./Utils/Avatar";
import Date from "./Utils/date";
export default function(props){
    if(!props.Post){
        return(
            <>
            </>
        );
    }
    return(
        <div className="cards">
            {props.Post.map((obj) => (
                
                <div className="card" style={{borderRadius:'6px'}}>
                    <div className="post"style={{borderRadius:'5px'}} >
                        <div className="post_info">
                            <Avatar username={obj.username}/>
                            <span>{obj.username}</span>
                            <small>{<Date time={obj.createdAt}/>}</small>
                        </div>
                        <div className="post_body">
                            <div className="post_media">
                            {String(obj.fileType)==="image"?(
                                <img src={obj.file} alt=""/>
                            ):(
                                <video src={obj.file} controls autoPlay/>
                            )}
                            </div>
                            
                            <div className="post_content">
                            {obj.caption}
                            </div>
                        </div>
                        <div className="post_footer">
                            <Like username={obj.username} likes={obj.like} key={obj._id} id={obj._id}/>
                        </div>
                        </div>
                </div>
                
            ))}
        </div>
    );
}
