import React from 'react'
import './Signup.css'
import { signup } from '../../services/LoginService'

const Signup = () => {

    const userObject = Object.freeze({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_no: "",
        password: "",
        id_type: "",
        id_details: "",
      });
    
    const [userData, updateFormData] = React.useState(userObject);

    const handleChange = (e)=>{
        updateFormData({
            ...userData,
            // dynamically map the name and value of the form data
            // name attribute has to be set on each element - else it will not work
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        console.log("Submitted Form")
        e.preventDefault()
        console.log(userData)
        signup(userData)
    }

    const isEnabled = (userData.first_name !== "") && (userData.last_name !== "")
    && (userData.email_id !== "") && (userData.phone_no !== "") && (userData.password !== "")
    && (userData.id_type !== "") && (userData.id_details !== "")


  return (
   
    <div>
        <form className='form-group container was-validated' id='signup-container' noValidate>
            <h2 className="fw-bold mb-2" style={{marginTop: '20%', paddingTop: '7%'}}>Sign up</h2>
            <div className='form-group'>
                <label className='form-label control-label'>First name</label>
                <input type="text" 
                    className='form-control form-control-md' 
                    placeholder='First name' required
                    name="first_name"
                    onChange={handleChange}
                    ></input>
                
            </div>
            <div className="form-group">
                <label className='form-label'>Last name</label>
                <input type="text" 
                    className='form-control form-control-md' 
                    placeholder='Last name' required
                    name='last_name'
                    onChange={handleChange}
                    ></input>
            </div>
            <div className="form-group">
                <label className='form-label'>Email-id </label>
                    <input type="text" 
                        className='form-control form-control-md' 
                        placeholder='Email-id' required
                        name="email_id"
                        onChange={handleChange}
                        ></input>
            </div>
            <div className="form-group">
                <label className='form-label'>Phone no </label>
                    <input type="tel"
                        className='form-control form-control-md'
                        placeholder='Phone no' required
                        name="phone_no"
                        onChange={handleChange}
                        ></input>
            </div>
            <div className="form-group">
                <label className='form-label'>Password </label>
                    <input type="Password"
                        className='form-control form-control-md'
                        placeholder='Password' required
                        name="password"
                        onChange={handleChange}
                        ></input>
            </div>
            <div className="form-group">
                <label className='form-label'>Select Id type </label>
                    <select className="form-select" 
                        aria-label="Select ID type"
                        name="id_type" required
                        onChange={handleChange}>
                        <option defaultValue={""}>Open this select menu</option>
                        <option value="passport">Passport</option>
                        <option value="state id card">State id card</option>
                        <option value="driver license">Driver License</option>
                    </select>
            </div>
            <div className="form-group">
                <label className='form-label'>Id no </label> 
                    <input type="text"
                        className='form-control form-control-md'
                        placeholder='Valid Id no' required
                        name="id_details"
                        onChange={handleChange}
                        ></input>
            </div>
            <div className="form-group" style={{textAlign: 'center', marginTop: '10%'}}>
                <button type="button" 
                        className="btn btn-primary btn-md" 
                        onClick={onFormSubmit} 
                        disabled={!isEnabled}
                        style={{width: 120}}>Submit</button>
            </div>

            <br></br>
        </form>    

    </div>
    
        
  )
}

export default Signup
