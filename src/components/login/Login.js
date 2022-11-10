import React, { useState } from 'react';
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const loginObject = Object.freeze({
        userName: "",
        password: "",
    })
    const navigate = useNavigate();

    const [loginData, updateFormData] = useState(loginObject);

    const handleInputChange = (e) => {
        updateFormData({
            ...loginData,
            [e.target.name]: e.target.value.trim()
        })
    }
    const onClickLoginSubmit = async (e) => {
        e.preventDefault()
        await login(loginData)
            .then(res => {
                if (res === true) {
                    navigate('/home');
                }
            });
    }


    const isEnabled = (loginData.userName !== "") && (loginData.password !== "")

    return (

        <div className='container' id='login-container'>
            <div className='row form-group' id='login-header'>
                <h2 className="fw-bold mb-2" style={{ padding: 30 }}>Log in</h2>
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
                        <a href="./signup" className="link-primary" >Sign up</a>
                    </p>
                </div>
            </div>
        </div>


    )
    {/* <form className='container was-validated' id='login-container' noValidate>

            <h2 className="fw-bold mb-2" style={{ padding: 30 }}>Log in</h2>

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
            <div className="form-group" style={{ textAlign: 'center' }}>
                <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={e => onClickLoginSubmit(e)}
                    style={{ width: 120 }}
                    disabled={!isEnabled}
                > Login
                </button>
            </div>

            <br></br>
            <div className="form-group" style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '12px' }}>Don't have an account?&nbsp;
                    <a href="./signup" className="link-primary" >Sign up</a>
                </p>
            </div>
            <br></br>
        </form> */}



}

export default Login