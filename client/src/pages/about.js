import React from 'react';
import { Container, Typography } from '@mui/material';

const aboutPageStyles = {
  paddingTop: '16px',
  paddingBottom: '16px',
  background: '#141a1f', 
  color: 'white',
  minHeight:'100vh',
};

const aboutTextStyles = {
  textAlign: 'center',
  maxWidth: 600,
  margin: '0 auto',
  fontSize:'25px'
};

const AboutPage = () => {
  return (
    <div style={aboutPageStyles}>
      <Container>
        <Typography variant="h4" align="center" paddingTop="100px" fontSize={'50px'} gutterBottom>
          About Our Social Media Website
        </Typography>
        <Typography variant="body1" style={aboutTextStyles} gutterBottom>
          Welcome to our social media platform! We believe in connecting people and fostering meaningful
          relationships. Our platform is designed to bring friends and loved ones together, no matter where they
          are in the world. Share your Photos, Videos, thoughts, and experiences with others, and explore a world of
          possibilities as you engage with our vibrant community.
        </Typography>
        <Typography variant="body1" style={aboutTextStyles} gutterBottom>
          Our mission is to provide a safe and enjoyable space for everyone. We are committed to ensuring the
          privacy and security of your data. Join us today and be a part of a positive and inclusive social media
          experience like never before!
        </Typography>
      </Container>
    </div>
  );
};

export default AboutPage;
