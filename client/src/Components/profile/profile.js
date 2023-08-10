import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./profile.css";
import { UserContext } from "../../Context/userContext";
import Post from "../Post";
import List from "../Utils/List";
const Profile = () => {
  const user = useParams();
  const [userdata, setUserData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollower,setshowFollower]=useState(false);
  const [showFollowing,setshowFollowing]=useState(false);
  const { userInfo } = useContext(UserContext);
  const [isUpdated,setIsUpdated]=useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("https://social-web-83ud.onrender.com/profile/" + user.id, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (req.ok) {
          const data = await req.json();
          setUserData(data);
        } else {
          setUserData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user.id, isFollowing,isUpdated]);
  useEffect(() => {
    const followers = userdata.followers && userdata.followers;
    const flag =
      followers && followers.find((obj) => obj === userInfo.username);
    if (flag) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  });
  useEffect(() => {
    async function fetchData() {
      if (image) {
        setIsUpdated(false);
        const response = await fetch("https://social-web-83ud.onrender.com/uploadImg", {
          method: "POST",
          body: JSON.stringify({ image: image }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        setIsUpdated(true);
      }
    }
    fetchData();
  },[image]);
  const handleImgUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  async function handleFollow() {
    if (!userInfo.username) {
        navigate("/login");
      return;
    } else {
      const req = await fetch("https://social-web-83ud.onrender.com/follow/" + user.id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      //console.log(req.status);
      setIsFollowing(!isFollowing);
    }
  }
  function handleShowFollower(){
    setshowFollower(!showFollower);
  }
  function handleShowFollowing(){
    setshowFollowing(!showFollowing);
  }
  return (
    <>
      {userdata.length === 0 && <h1>No user found</h1>}
      <div className="MBox">
        <div className="Profile">
          <div className="ProfileImg">
            <img
              style={{ borderRadius: "50%" }}
              src={userdata.profilePic?userdata.profilePic:"https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1"}
              alt=""
            ></img>
          </div>

          <div className="DetailBox">
            <div className="b1">
              <div className="b11">{"@" + userdata.username}</div>
              <div className="b12">
                {userInfo && user.id === userInfo.username ? (
                  <label for="upload">
                    <span
                      class="btn btn-info"
                      aria-hidden="true"
                    >Change Profile Pic</span>

                    <input
                      type="file"
                      id="upload"
                      style={{ display: "none" }}
                      onChange={handleImgUpload}
                    />
                  </label>
                ) : (
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            </div>
            <div className="Details">
              <div className="posts">
                <div>{userdata.post && userdata.post.length}</div>
                <div style={{fontFamily:'cursive',fontWeight:'lighter',fontSize:'30px',color:'slategray'}}>Posts</div>
              </div>
              <div className="follwers">
                <div>{userdata.followers && userdata.followers.length}</div>
                <div style={{fontFamily:'cursive',fontWeight:'lighter',fontSize:'30px',color:'slategray',cursor:'pointer'}} onClick={handleShowFollower}>Followers</div>
                {showFollower && <List list={userdata.followers} show={setshowFollower} key={userdata.username}/>}
              </div>
              <div className="following">
                <div>{userdata.following && userdata.following.length}</div>
                <div style={{fontFamily:'cursive',fontWeight:'lighter',fontSize:'30px',color:'slategray',cursor:'pointer'}} onClick={handleShowFollowing}>Following</div>
                {showFollowing && <List list={userdata.following} show={setshowFollowing} key={userdata.username}/>}
              </div>
            </div>
            <div className="b2">{userdata.name}</div>
          </div>
        </div>
        <div className="Posts">
          <Post Post={userdata.post} key={userdata.username}/>
        </div>
      </div>
    </>
  );
};

export default Profile;
