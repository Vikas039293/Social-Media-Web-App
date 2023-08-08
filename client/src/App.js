import './App.css';
import React from 'react';
import Home from "./pages/home";
import Login from './pages/login';
import About from './pages/about';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './pages/Layout';
import Compose from "./pages/compose";
import Register from './pages/register';
import { UserContextProvider } from './Context/userContext';
import Profile from './Components/profile/profile';
function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="login" name="login" element={<Login/>}/>
          <Route path="about" name="about" element={<About/>}/>
          <Route path="logout" name="logout" element={<About/>}/>
          <Route path="compose" name="compose" element={<Compose/>}/>
          <Route path="register" name="register" element={<Register/>}/>
          <Route path='profile/:id' element={<Profile/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
