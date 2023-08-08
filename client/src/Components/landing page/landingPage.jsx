import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import './landingPage.css';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
    const navigate=useNavigate();
    function handleClick(){
        navigate("/register");
    }
  return (
    <div className="landing-page" 
    >
      <Container maxWidth="md">
        <Typography variant="h2" align="center" paddingTop="150px" gutterBottom color={'#f5f5f3'}>
          Welcome to Our Social Media Platform
        </Typography>
        <Typography variant="h5" align="center" color={'#f5f5f3'} gutterBottom>
          Connect, Share, and Engage with Friends
        </Typography>
        <Typography variant="body1" align="center" color={'#f5f5f3'} gutterBottom>
          Join our social media community today and stay connected with your friends and loved ones.
          Share your moments, thoughts, and experiences with the world. Sign up now and explore the possibilities!
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary" size="large" onClick={handleClick}>
            Sign Up Now
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
