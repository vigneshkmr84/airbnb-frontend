import React from 'react'
// import { Form } from 'react-bootstrap'

const Signup = () => {

  return (
   
    <div>
        <form className='form-inline'>
            <h3 /* className="fw-bold mb-2" */> Signup</h3>
            {/* <div className='mb-3'>
                <label>First Name</label>
                <input type="text" className='form-control form-control-md' placeholder='First Name' required ></input>
            </div> */}
            {/* <div className="form-outline mb-1"> */}
            <div className='form-group'>
                <label className='form-label control-label' /* style={{float: "right"}} */>First name
                    <input type="text" className='form-control form-control-md' placeholder='First name' required></input>
                </label>
            </div>
            <div className="form-outline mb-1">
                <label className='form-label'>Last name
                    <input type="text" className='form-control form-control-md' placeholder='Last name' required></input>
                </label>
            </div>
            <div className="form-outline mb-1">
                <label className='form-label'>Email-id
                    <input type="text" className='form-control form-control-md' placeholder='Email-id' required></input>
                </label>
            </div>
            <div className="form-outline mb-1">
                <label className='form-label'>Phone no
                    <input type="text" className='form-control form-control-md' placeholder='Phone no' required></input>
                </label>
            </div>
            <div className="form-outline mb-1">
                <label className='form-label'>Password
                    <input type="Password" className='form-control form-control-md' placeholder='Phone no' required></input>
                </label>
            </div>
            <div className="form-outline mb-1">
                <label className='form-label'>Select Id type
                    {/* <input type="text" className='form-control form-control-md' placeholder='Phone no' required></input> */}
                    <select className="form-select" aria-label="Select ID type">
                        <option selected>Open this select menu</option>
                        <option value="passport">Passport</option>
                        <option value="state id card">State id card</option>
                        <option value="driver license">Driver License</option>
                    </select>
                </label>
            </div>
            <div className="form-outline mb-1">
                <label className='form-label'>Id no
                    <input type="text" className='form-control form-control-md' placeholder='Valid Id no' required></input>
                </label>
            </div>
            <div className="form-outline mb-4">
                <button type="button" className="btn btn-primary btn-md" /* onClick={onSubmit} */ style={{width: 120}}>Submit</button>
            </div>
        </form>    

    </div>
    
        
  )
}

export default Signup
