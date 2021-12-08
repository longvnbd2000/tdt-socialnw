import { useState } from 'react'
import {GoogleLogin} from 'react-google-login'
import './Signin.css'

export default function Signin() {

    const [toggle, setToggle] = useState('toggle')
    const [toggleBtnStd, setToggleBtnStd] = useState('toggle-btn std or')
    const [toggleBtnOth, setToggleBtnOth] = useState('toggle-btn oth')
    const [students, setStudents] = useState('students')
    const [others, setOthers] = useState('others')

    const studentSignin = () => {
        setToggle('toggle')
        setStudents('students') 
        setOthers('others')
        setToggleBtnOth('toggle-btn oth')
        setToggleBtnStd('toggle-btn std or')
    }
    const othersSignin = () => {
        setToggle('toggle or')
        setStudents('students or') 
        setOthers('others or')
        setToggleBtnOth('toggle-btn oth or')
        setToggleBtnStd('toggle-btn std')
    }

    return (
        <>
        <div className="signin-container">
            
            <div className="signin-form">
                <h1 className="logo">TDTU</h1>
                <div className="toggle-box">
                    <div className={toggle}></div>
                    <button type="button" className={toggleBtnStd} onClick={studentSignin}>Students</button>
                    <button type="button" className={toggleBtnOth} onClick={othersSignin}>Others</button>
                </div>


                <form action="" className={others}>
                    <div className="form-group">
                        <input type="text" placeholder="Username"/>
                    </div>
                    <br/>
                    <div className="form-group">  
                        <input type="password" placeholder="Password"/>
                    </div>
                    <button className="submit-btn" type="submit">Sign in</button>
                </form>

                <div className={students}>
                    <div>@student.tdtu.edu.vn</div>

                    <a href='http://localhost:8080/api/auth/google'>signin with google</a>
                </div>
                
            </div>
            
        </div>  
        </>
    )
}
