import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import SearchBar from "../Components/SearchBar/searchBar";
import Avatar from "../Components/Utils/Avatar";
const Layout = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const token=localStorage.getItem("token");
  const navigate=useNavigate();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://social-web-83ud.onrender.com/protected", {

        headers:{
          'Content-Type':'application/json',
          Authorization:'Bearer '+token,
        },
      });
      const user = await response.json();
      setUserInfo(user);
    }
    if(token){
      fetchData();
    }
    // fetchData();
  }, []);
  function logout() {
    async function fetchData() {
      const res = await fetch("https://social-web-83ud.onrender.com/logout", {
        credentials: "include",
        method: "POST",
      });
      
    }
    fetchData();
    const x=localStorage.removeItem("token");
    // console.log(localStorage.getItem("token"));
    setUserInfo(null);
    navigate("/");
  }
  const username = userInfo ? userInfo.username : null;
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-header">
          <p className="navbar-brand" id="home" onClick={()=>{navigate("/")}} style={{cursor:'pointer'}}>
            Social Media
          </p>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li id="home" className="nav-item active">
              <Link to="/" className="nav-link">
                Home<span className="sr-only">(current)</span>
              </Link>
            </li>
            {!username && (
              <li className="nav-item active">
                <Link to="/register" className="nav-link">
                  Regester
                </Link>
              </li>
            )}
            {!username && (
              <li className="nav-item active">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item active">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            {username && (
              <li className="nav-item active">
                <Link to="/compose" className="nav-link">
                  Post
                </Link>
              </li>
            )}
            {username && (
              <li className="nav-item active" onClick={logout}>
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
            )}
          </ul>
          {username && <SearchBar placehoder="Seach User" />}
          {username && (
            <span>
              <Avatar username={username} />
            </span>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Layout;

