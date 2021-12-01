import {GoogleLogin} from 'react-google-login'

export default function Login() {
    return (
        <>
        <div className="login-container">
            
            <div className="login-form">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="">Name</label>
                        <br/>
                        <input type="text" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="">Pass</label>
                        <br/>
                        <input type="password" />
                    </div>
                    <input type="button" value="login" />
                </form>
              
                <GoogleLogin
                    className="login-gg-btn"
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                
                    
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            
        </div>  
        </>
    )
}
