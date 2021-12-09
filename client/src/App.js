import Announcement from "./pages/Announcement";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SigninPage from "./pages/SigninPage";
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/signin" element={<SigninPage/>} />   

        <Route path="/announcement" element={<Announcement/>} />    

        <Route path="/profile/:emailname" element={<Profile />} />

        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
