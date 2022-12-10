import React, { useState } from 'react';
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';
import { callLoginApi } from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';
import Signup from '../signup/Signup';
// import logo from './logo/logo3.svg';


const Login = () => {

    const loginObject = Object.freeze({
        userName: "",
        password: "",
    })
    const navigate = useNavigate();

    const [loginData, updateFormData] = useState(loginObject);
    const [showSignup, setShowSignup] = useState(false);

    const handleInputChange = (e) => {
        updateFormData({
            ...loginData,
            [e.target.name]: e.target.value.trim()
        })
    }
    const onClickLoginSubmit = async (e) => {
        e.preventDefault()

        await callLoginApi(loginData)
            .then(status => {
                if (status === 200) {
                    navigate('/home');
                    window.location.reload(true);
                }
            });
    }


    const isEnabled = (loginData.userName !== "") && (loginData.password !== "")

    return (

        <div style={{ display: 'inline-block', width: '100%' }}>
            <div className='container'>
                <h1 style={{ textAlign: 'center', paddingTop: '3%', font: '' }}>Welcome to Airdnd</h1>
                <h6 style={{ textAlign: 'center' }}>Book your stays</h6>
            </div>
            <div className='container' id='login-container'>
                <div className='row form-group' id='login-header'>
                    <h2 className="fw-bold mb-2" style={{ padding: '1%' }}>Log in</h2>
                </div>
                <div id='login-body' className='container'>
                    <div className='row form-group'>
                        <label className='form-label'>Username</label>
                        <input type="text"
                            className='form-control form-control-md'
                            placeholder='Email id / Phone no' required
                            name="userName"
                            onChange={handleInputChange}
                        >
                        </input>
                    </div>

                    <div className="row form-group">
                        <label className='form-label'>Password </label>
                        <input type="Password"
                            className='form-control form-control-md'
                            placeholder='Password' required
                            name="password"
                            onChange={handleInputChange}
                        >
                        </input>
                    </div>

                    <div className="row form-group" style={{ textAlign: 'center', justifyContent: 'center', paddingTop: '6%' }}>
                        <button type="button"
                            className="btn btn-primary btn-lg w-50"
                            onClick={e => onClickLoginSubmit(e)}
                            disabled={!isEnabled}
                        > Login
                        </button>
                    </div>
                </div>

                <div id='login-footer'>
                    <div className="row form-group" style={{ textAlign: 'center', paddingTop: '5%' }}>
                        <p style={{ fontSize: '12px' }}>Don't have an account?&nbsp;
                            <a className="text-primary" onClick={(e) => { setShowSignup(true) }}>Sign up</a>
                        </p>
                    </div>
                </div>

                <Signup showSignup={showSignup} setShowSignup={setShowSignup} />
            </div>
        </div>
    )

}


export default Login

