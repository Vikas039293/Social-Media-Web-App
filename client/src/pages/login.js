import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Bloger Boy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignIn() {
  const { setUserInfo } = React.useContext(UserContext);
  const {token,setToken}= React.useContext(UserContext);
  const navigate = useNavigate();
  const [checked,setChecked]=React.useState(true);
  const handleChange=(event)=>{
    setChecked(event.target.checked);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      username: data.get("username"),
      password: data.get("password"),
      remember: checked,
    };
    const response = await fetch("https://social-web-83ud.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      const Info = await response.json();
      setUserInfo(Info);
      localStorage.setItem("token",Info.token);
      navigate("/");
    } else {
      alert("Wrong Crendentials");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" checked={checked} onChange={handleChange} />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

// import React, { useContext } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../Context/userContext";

// function Login(){
//     const [formData,setformData]=useState({
//         username:"",
//         password:""
//     });
//     const [redirect,setRedirect]=useState(false);
//     const navigate=useNavigate();
//     const {setUserInfo}= useContext(UserContext);

//     function handleChange(event){
//         const {name,value}=event.target;
//         setformData(prevData => (
//             {
//                 ...prevData,
//                 [name]:value
//             }
//         ));
//     }
//     async function handleSubmit(event){
//         event.preventDefault();
//         const response=await fetch("http://localhost:4000/login",{
//             method:'POST',
//             body: JSON.stringify(formData),
//             headers:{'Content-Type':'application/json'},
//             credentials:'include',
//         });
//         if(response.ok){
//             const Info=await response.json();
//             setUserInfo(Info);
//             setRedirect(true);
//         }
//         else{
//             alert("Wrong Crendentials");
//         }
//     }
//     if(redirect){
//         navigate("/");
//     }
//     return (
//         <div>
//             <h1>Login Page</h1>
//             <form onSubmit={handleSubmit} >
//                 <div>
//                     <label>Username</label>
//                     <input type="text" value={formData.username} name="username" onChange={handleChange}></input>
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input type="password" name="password" value={formData.password} onChange={handleChange}></input>
//                 </div>
//                 <div>
//                     <button type="submit">Login</button>
//                 </div>
//             </form>
//         </div>
//     );
// }
// export default Login;
