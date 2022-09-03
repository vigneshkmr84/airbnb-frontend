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

    /* function SubmitButton(){
        if (loginData.userName && loginData.password){
          return <button type="button" className="btn btn-primary btn-lg">Button</button>
        } else {
          return <button type="button" className="btn btn-primary btn-lg" disabled>Button</button>
        };
      }; */
      const isEnabled = (loginData.userName != "") && (loginData.password != "")

  return (

        <form className='container was-validated' id='login-container' noValidate>

            <h2 className="fw-bold mb-2" style={{padding: 30}}>Log in</h2>

            {/* <div className="form-group"> */}
            <div className="form-group">
                <label className='form-label'>Username</label>
                    <input type="text" 
                        className='form-control form-control-md' 
                        placeholder='Email id / Phone no' required 
                        name="userName"
                        onChange={handleChange}
                    >
                    </input>
                    {/* <div class="valid-feedback"> Looks good! </div> */}
                    <div className="invalid-feedback"> Please enter email id/phone number </div>
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
                    <div className="invalid-feedback"> Missing password</div>
            </div>

            <br></br>
            <div className="form-group" style={{textAlign: 'center'}}>
                <button type="button" 
                    className="btn btn-primary btn-lg" 
                    onClick={handleSubmit} 
                    style={{width: 120}}
                    // disabled={!isEnabled}
                    > Login
                </button>
            </div>
            
            <br></br>
            <div className="form-group" style={{textAlign: 'center'}}>
                <p style={{fontSize: '12px'}}>Don't have an account? <a href="#!" className="link-primary" >Sign up</a></p>
            </div>
            <br></br>
        </form>

  )
}

export default Login