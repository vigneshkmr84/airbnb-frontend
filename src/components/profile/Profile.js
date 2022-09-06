import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './Profile.css'
// import logo from '../../../images/user-profile.jpg'
import logo from './user-profile.jpg'
import { getUserProfile } from '../../services/ProfileService'

const Profile = () => {

    const defaultUserDetails = {
        first_name: '',
        last_name: '',
        email_id: '',
        phone_no: '',
        id_details: '',
        id_type: '',
    }
    const [userData, setUserDetails] = useState(defaultUserDetails);
    // const [userData, setUserDetails] = React.useState(defaultUserDetails);

    const handleChange = (e) => {
        setUserDetails({
            ...userData,
            // dynamically map the name and value of the form data
            // name attribute has to be set on each element - else it will not work
            [e.target.name]: e.target.value.trim()
        })
    }
    
    useEffect(() => {
        // fetch the user details for the given id 
        // and set them to userData
        getUserProfile('6316bca14fad5c24245666ca')
            .then((res) => {
                setUserDetails(res);
            });
        console.log(userData.first_name);
        /* async function fetchUserDetails(e) {
            let response = await getUserProfile('6316bca14fad5c24245666ca')
            console.log(response)
            setUserDetails({
                ...userData,
                // dynamically map the name and value of the form data
                // name attribute has to be set on each element - else it will not work
                [e.target.name]: e.target.value.trim()
            })
          }
      
          // calling userDetails api
          fetchUserDetails() */
    }, []);



    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            <div id='profile-container' style={{ width: '100%' }}>
                <div className="container rounded bg-white mt-5 mb-5">
                    <h1 className='profileHeading'>Personal Details</h1>
                    <div id="profile-details" className='row'>
                        <div className="col-md-4">
                            <div id='image-container'>
                                <img src={logo} alt='user profile' id='profile-picture' />
                            </div>
                        </div>

                        <div className="col-md-8" style={{ width: '50%' }}>
                            <form>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>First name</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            // placeholder='First name' 
                                            name='first_name'
                                            defaultValue={userData.first_name}
                                            // onChange={handleChange}
                                        >

                                        </input>
                                    </div>

                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>Last name</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            // placeholder='Last name' 
                                            name='last_name'
                                            defaultValue={userData.last_name}
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>Email Id</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            // placeholder='Email id' 
                                            name='email_id'
                                            defaultValue={userData.email_id}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>Phone no</label>
                                        <input type='tel'
                                            className='form-control mr-sm-2'
                                            // placeholder='Phone no' 
                                            name='phone_no'
                                            defaultValue={userData.phone_no}
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>Id type</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            // placeholder='Valid Id no' 
                                            // defaultValue={userData.id_type}
                                            name='id_type'
                                            defaultValue={userData.id_type}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-md-6'>

                                        <label className='form-label control-label'>Valid Id no</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            // placeholder='Valid Id no' 
                                            name='id_details'
                                            defaultValue={userData.id_details}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <br></br>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className="form-group" style={{ textAlign: 'center' }}>
                                            <button type="button"
                                                id='update-info'
                                                className="btn btn-primary btn-lg"
                                            // onClick={handleSubmit}
                                            // disabled={!isEnabled}
                                            > Update Info
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile