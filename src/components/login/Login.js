import React from 'react';
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';
import {login} from '../../services/LoginService';

const Login = () => {
    
    const loginObject = Object.freeze({
        userName: "",
        password: "",
    })

    const [loginData, updateFormData] = React.useState(loginObject);

    const handleChange = (e) => {
        updateFormData({
            ...loginData,
            [e.target.name]: e.target.value.trim()
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(loginData);
        login(loginData);
    }

  return (

        <form className='form-group container' id='login-container'>

            <h2 className="fw-bold mb-2" style={{padding: 30}}>Log in</h2>

            <div className="form-group">
                <label className='form-label'>Username</label>
                    <input type="text" 
                        className='form-control form-control-md' 
                        placeholder='Email id / Phone no' required 
                        name="userName"
                        onChange={handleChange}
                    >
                    </input>
            </div>

            <div className="form-group">
                <label className='form-label'>Password </label>
                    <input type="Password" 
                        className='form-control form-control-md' 
                        placeholder='Password' required 
                        name="password"
                        onChange={handleChange}
                    >
                    </input>
            </div>

            <br></br>
            <div className="form-group" style={{textAlign: 'center'}}>
                <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit} style={{width: 120}}>Login</button>
            </div>
            <div className="form-group" style={{textAlign: 'center'}}>
                <p style={{fontSize: '12px'}}>Don't have an account? <a href="#!" className="link-primary" >Sign up</a></p>
            </div>
            <br></br>
        </form>

  )
}

export default Login