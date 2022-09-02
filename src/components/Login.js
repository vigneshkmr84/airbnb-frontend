import React from 'react';
// import { Form } from 'react-bootstrap';
//import styles from '/Users/vigneshthirunavukkarasu/Library/CloudStorage/OneDrive-Personal/my-works_updated/react/airbnb/src/App.css'
// import styles from '../App.css';
// import Toast from './toast/Toast';

// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './toast/Toast';


import { useState } from 'react';

const Login = () => {
    
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    
    const onSubmit = () =>{
        console.log("Login Submitted");
        console.log("Username " + userName );
        console.log("Password " + password );
        // toast.error("Invalid Username / Password");
        Toast('Successfully Created', 'success');
    }

  return (
    // <div>Login</div>
    // <div>
        // <div className='container' id='login-container' style={{maxWidth: "28%", height: "65%"}}>
        
        <form className='form-group container' id='login-container'>
            

            <h2 className="fw-bold mb-2" style={{padding: 30}}>Log in</h2>
            <div className="form-outline mb-4">
                <label className='form-label'>Username
                    <input type="text" className='form-control form-control-md' placeholder='Email id / Phone no' required onChange={(e) => setUserName(e.target.value)}></input>
                </label>
            </div>

            <div className="form-outline mb-4">
                <label className='form-label'>Password
                    <input type="Password" className='form-control form-control-md' placeholder='Password' required onChange={(e) => setPassword(e.target.value)}></input>
                </label>
            </div>
            <br></br>
            <div className="form-outline mb-4">
                <button type="button" className="btn btn-primary btn-lg" onClick={onSubmit} style={{width: 120}}>Login</button>
            </div>
            <div className="form-outline mb-4">
                <p>Don't have an account? <a href="#!" className="link-primary" >Sign up</a></p>
            </div>
            <br></br>
        </form>

        // </div>
    // </div>
  )
}

export default Login