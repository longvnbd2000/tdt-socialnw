import Announcement from "./pages/Announcement";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SigninPage from "./pages/SigninPage";
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { PostContext } from "./context/PostContext";
import axios from "axios";
import Register from "./pages/Register/Register";
import CreateAnnouncement from "./pages/CreateAnnouncement/CreateAnnouncement";

function App() {
  const SV = process.env.REACT_APP_SV_HOST
  
  const userToken = localStorage.getItem('userToken')
  const {user, dispatch} = useContext(AuthContext)

  const fetchUser = async () => {
    dispatch({type: "SIGNIN_START"})
    try{
      const user = await axios.get(SV+"/auth/user/" + userToken)
      dispatch({type: "SIGNIN_SUCCESS", payload: user.data})
    }
    catch(err){
      dispatch({type: "SIGNIN_FAILURE", payload: err})
    }
  }

  useEffect(() => {
    if(userToken){
      fetchUser()
    }
  
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={  user ? <Home/> : <SigninPage />} />

        <Route path="/signin" element={  user ? <Navigate to="/" /> : <SigninPage />} />   

        <Route path="/announcement" element={  user ? <Announcement/> : <SigninPage />} />  

        <Route path="/announcement/create" element={  user && user.role === "faculty" ? <CreateAnnouncement/> : <SigninPage />} />   

        <Route path="/profile/:emailname" element={  user ? <Profile /> : <SigninPage />} />

        <Route path="/register" element={ user && user.role === "admin" ? <Register /> : <Navigate to="/" />} />

        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
