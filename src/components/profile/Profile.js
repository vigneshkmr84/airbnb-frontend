import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './Profile.css'
import defaultUserImage from './user-profile.jpg'
import { getUserProfile, updateUserProfile } from '../../services/ProfileService'
import Spinner from 'react-bootstrap/Spinner';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import AddPropertyModal from './AddPropertyModal'


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

    const [showNewPropertyModal, setShowNewPropertyModal] = useState(false);

    const [updatedUserData, setUpdatedUserData] = useState({});

    const [isEditEnabled, setIsEnabled] = useState(false);

    const cancelNewPropertyModal = () => {
        setShowNewPropertyModal(false);
    }
    // function onClickEditInfo() {
    const onClickEditInfo = (e) => {
        console.log('Edit Enabled')
        setIsEnabled(!isEditEnabled);
    }

    const handleChange = (e) => {
        setUpdatedUserData({
            ...updatedUserData,
            // dynamically map the name and value of the form data
            // name attribute has to be set on each element - else it will not work
            [e.target.name]: e.target.value.trim()
        });
    }

    useEffect(() => {
        // fetch the user details for the given id 
        // and set them to userData

        //  getUserProfile('6313358188e367845973f368')
        var token_data = jwt_decode(Cookies.get('token'));
        console.log(token_data)
        getUserProfile(token_data.user_id)
            .then((res) => {
                setUserDetails(res);
            });
        console.log(userData.first_name);
    }, []);


    const [updated, setUpdated] = useState(false);

    const markUpdated = () => setUpdated(true);

    const submitForm = () => {
        setIsEnabled(false);
        console.log("Form submitted");
        console.log(updatedUserData)
        if (updatedUserData === {}) {
            console.log("No updates")
        } else {
            console.log("Updating user data")
            updateUserProfile('6313358188e367845973f368', updatedUserData);
        }
    }

    const addProperty = () => {
        console.log("Add Property Clicked");
        setShowNewPropertyModal(true);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            <div id='profile-container' style={{ width: '100%' }}>
                {/*                 <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> */}
                <div className="container rounded bg-white mt-5 mb-5">
                    <h1 className='profileHeading'>Personal Details</h1>
                    <div id="profile-details" className='row'>
                        <div className="col-md-4">
                            <div id='image-container'>
                                <UserProfilePhoto profile_photo={userData.profile_photo} />
                            </div>
                        </div>

                        <div className="col-md-8" style={{ width: '50%' }}>
                            <form
                                onChange={markUpdated}>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>First name</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            name='first_name'
                                            defaultValue={userData.first_name}
                                            onChange={handleChange}
                                            disabled={(isEditEnabled) ? "" : "disabled"}
                                        >

                                        </input>
                                    </div>

                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>Last name</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            name='last_name'
                                            defaultValue={userData.last_name}
                                            onChange={handleChange}
                                            disabled={(isEditEnabled) ? "" : "disabled"}
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>Email Id</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            name='email_id'
                                            defaultValue={userData.email_id}
                                            onChange={handleChange}
                                            disabled={(isEditEnabled) ? "" : "disabled"}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>Phone no</label>
                                        <input type='tel'
                                            className='form-control mr-sm-2'
                                            name='phone_no'
                                            defaultValue={userData.phone_no}
                                            onChange={handleChange}
                                            disabled={(isEditEnabled) ? "" : "disabled"}
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='form-label control-label'>Id type</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            name='id_type'
                                            defaultValue={userData.id_type}
                                            onChange={handleChange}
                                            disabled={(isEditEnabled) ? "" : "disabled"}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-md-6'>

                                        <label className='form-label control-label'>Valid Id no</label>
                                        <input type='text'
                                            className='form-control mr-sm-2'
                                            name='id_details'
                                            defaultValue={userData.id_details}
                                            onChange={handleChange}
                                            disabled={(isEditEnabled) ? "" : "disabled"}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <br></br>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group" style={{ textAlign: 'center' }}>
                                            <button type="button"
                                                id='editButton'
                                                className="btn btn-danger btn-md"
                                                onClick={onClickEditInfo}
                                            > Edit Info
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="form-group" style={{ textAlign: 'center' }}>
                                            <button type="button"
                                                id='update-info'
                                                className="btn btn-primary btn-md"
                                                onClick={submitForm}
                                                disabled={(isEditEnabled) ? "disabled" : ""}
                                            > Update Info
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <button type="button"
                                            id='update-info'
                                            className="btn btn-primary btn-md"
                                            onClick={addProperty}
                                        > Add Property
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <AddPropertyModal showNewPropertyModal={showNewPropertyModal} cancelNewPropertyModal={cancelNewPropertyModal} /* user_id='630d9e1a5a8e270b69c8e947' */ />
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}


function UserProfilePhoto(profile_photo) {

    console.log("Rendering Image")
    if (profile_photo.profile_photo === "") {
        return (<img src={defaultUserImage} alt='user profile' id='profile-picture' />)
    } else {
        return (<img src={"data:image/png;base64," + profile_photo.profile_photo} alt="Red dot" id="profile-picture" />)
    }

}
export default Profile