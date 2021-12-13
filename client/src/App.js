import Announcement from "./pages/Announcement";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SigninPage from "./pages/SigninPage";
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import Register from "./pages/Register/Register";

function App() {
  const userToken = localStorage.getItem('userToken')
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" element={  user ? <Home/> : <SigninPage />} />

        <Route path="/signin" element={  user ? <Navigate to="/" /> : <SigninPage />} />   

        <Route path="/announcement" element={  user ? <Announcement/> : <SigninPage />} />    

        <Route path="/profile/:emailname" element={  user ? <Profile /> : <SigninPage />} />

        <Route path="/register" element={ user && user.role == "admin" ? <Register /> : <Navigate to="/" />} />

        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
