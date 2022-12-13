import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import AddPropertyModal from './AddPropertyModal'
import { getUserProfileApi, updateUserProfileApi } from '../../services/ProfileService'
import { convertImageToBase64, getUserId, isHost } from '../common/CommonUtils'
import Form from 'react-bootstrap/Form';
import BecomeHostModal from './BecomeHostModal'
import moment from 'moment-timezone';

import './Profile.css'
import defaultUserImage from './user-profile.jpg'
import { renderSpinner } from '../common/CommonElements'
import ShowHostProperties from './HostProperties/ShowHostProperties'
import { getPropertiesListByHostId } from '../../services/PropertiesService'

const Profile = () => {

    const fileFormats = 'image/*, .heic';

    const defaultUserDetails = {
        first_name: '',
        last_name: '',
        email_id: '',
        phone_no: '',
        id_details: '',
        id_type: '',
    }

    const emptyPropertyDetails =
    {
        name: "",
        description: "",
        one_liner: "",
        location: "",
        house_type: "villa",
        cost_per_day: 0,
        service_cost: 0,
        cleaning_cost: 0,
        latitude: 0,
        longitude: 0,
        guests: 1,
        bedroom: 1,
        bathroom: 1,
        checkin_time: 11,
        checkout_time: 16,
        house_rules: [],
        amenities: [
            {
                category: "living",
                amenities: []
            },
            {
                category: "kitchen",
                amenities: []
            },
            {
                category: "bedroom",
                amenities: []
            },
            {
                category: "bathroom",
                amenities: []
            },
            {
                category: "garage",
                amenities: []
            },
            {
                category: "others",
                amenities: []
            },
        ],
        img: "",
        cancellation_policy: "",
        host_id: "",
    }

    const [is_host, setIsHost] = useState(isHost() || false);

    const [userData, setUserDetails] = useState(defaultUserDetails);

    const [showNewPropertyModal, setShowNewPropertyModal] = useState(false);

    const [updatedUserData, setUpdatedUserData] = useState({});

    const [isEditEnabled, setIsEnabled] = useState(false);

    const [dataReady, setDataReady] = useState(false);

    const [propertiesList, setPropertiesList] = useState([]);

    const fileRef = useRef(null);

    const handleUploadProfilePicture = () => { fileRef.current.click() }

    const handleFileChange = async (e) => {
        console.log('handling profile pic change')
        const file = e.target.files && e.target.files[0]

        await convertImageToBase64(file)
            .then((data) => {
                setUpdatedUserData({
                    ...updatedUserData,
                    ["profile_photo"]: data.split("base64,")[1]
                });
                setUserDetails({ ...userData, ["profile_photo"]: data.split("base64,")[1] });
            }).then()
    }

    const cancelNewPropertyModal = () => {
        setShowNewPropertyModal(false);
    }

    const onClickEditInfo = () => {
        console.log('Edit Enabled')
        setIsEnabled(!isEditEnabled);
    }

    const handleChange = (e) => {
        setUpdatedUserData({
            ...updatedUserData,
            [e.target.name]: e.target.value.trim()
        });
    }

    useEffect(() => {
        // fetch the user details for the given id 
        // and set them to userData

        getUserProfileApi(getUserId())
            .then((res) => {
                setUserDetails(res);
                console.log(res.first_name);
                setDataReady(true);
            })
    }, []);

    useEffect(() => {
        getPropertiesListByHostId()
            .then((res) => {
                setPropertiesList(res)
            })
    }, [])

    const [updated, setUpdated] = useState(false);

    const markUpdated = () => setUpdated(true);

    const submitForm = async () => {
        setIsEnabled(false);
        console.log("Update user data Form submitted");
        console.log(updatedUserData)
        if (updatedUserData === {}) {
            console.log("No updates")
        } else {
            console.log("Updating user data")
            await updateUserProfileApi(updatedUserData)
                .then(setUserDetails({ ...userData, updatedUserData }));
        }
    }

    const addProperty = () => {
        console.log("Add Property Clicked");
        setShowNewPropertyModal(true);
    }

    // const [host, setHost] = useState(isHost());
    const [showHostConfirmation, setShowHostConfirmation] = useState(false);


    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            <div id='profile-container' >

                <div className="container rounded bg-white mt-5 mb-5">
                    <h1 className='profileHeading'>Personal Details</h1>
                    {
                        !dataReady ? renderSpinner() :
                            <>
                                <div id="profile-details" className='row'>
                                    <div className="col-md-4">
                                        <div id='image-container'>
                                            {renderUserProfilePhoto(userData.profile_photo)}
                                        </div>
                                        <br></br>
                                        <br></br>
                                        {isEditEnabled ?
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <input
                                                    type='file'
                                                    accept={fileFormats}
                                                    ref={fileRef}
                                                    style={{ display: 'none' }}
                                                    onChange={e => handleFileChange(e)}
                                                >
                                                </input>
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={e => handleUploadProfilePicture()}
                                                >
                                                    <i className="bi bi-camera"></i> &nbsp;Upload Image
                                                </button>
                                            </div>
                                            : <></>}
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
                                                        // disabled={(isEditEnabled) ? "" : "disabled"}
                                                        disabled
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
                                                        // disabled={(isEditEnabled) ? "" : "disabled"}
                                                        disabled
                                                    >
                                                    </input>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <label className='form-label control-label'>Description</label>
                                                    <input type='text'
                                                        className='form-control mr-sm-2'
                                                        name='description'
                                                        defaultValue={userData.description}
                                                        onChange={handleChange}
                                                        disabled={(isEditEnabled) ? "" : "disabled"}
                                                    >
                                                    </input>
                                                </div>
                                                <div className='col-md-6'>
                                                    <label className='form-label control-label'>Languages</label>
                                                    <input type='text'
                                                        className='form-control mr-sm-2'
                                                        name='languages'
                                                        defaultValue={userData.languages}
                                                        onChange={handleChange}
                                                        disabled={(isEditEnabled) ? "" : "disabled"}
                                                    >
                                                    </input>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <label className='form-label control-label'>Id type</label>
                                                    <select
                                                        className="form-select"
                                                        aria-label="Select Id Type"
                                                        name="id_type"
                                                        required
                                                        onChange={handleChange}
                                                        defaultValue={userData.id_type}
                                                        disabled={(isEditEnabled) ? "" : "disabled"}
                                                    >
                                                        <option value="passport">Passport</option>
                                                        <option value="state id card">State id card</option>
                                                        <option value="driver license">Driver License</option>
                                                    </select>
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
                                                <div className='col-md-4'>
                                                    <div className="form-group" style={{ textAlign: 'center' }}>
                                                        <button
                                                            className="btn btn-secondary btn-md"
                                                            type="button"
                                                            id='editButton'
                                                            onClick={onClickEditInfo}
                                                        >
                                                            <i className="bi bi-pencil"></i> &nbsp;&nbsp;Edit Info
                                                        </button>
                                                    </div>
                                                </div>
                                                {
                                                    isEditEnabled ?
                                                        <div className='col-md-4'>
                                                            <div className="form-group" style={{ textAlign: 'center' }}>
                                                                <button
                                                                    className="btn btn-primary btn-md"
                                                                    type="button"
                                                                    id='update-info'
                                                                    onClick={submitForm}
                                                                > Update
                                                                </button>
                                                            </div>
                                                        </div>
                                                        : <div className='col-md-4'></div>
                                                }
                                                <div className='col-md-4'>
                                                    {isHost()
                                                        ?
                                                        // Add property button
                                                        <button type="button"
                                                            id='update-info'
                                                            className="btn btn-primary btn-md"
                                                            onClick={addProperty}
                                                        > Add Property
                                                        </button>

                                                        :
                                                        // Host toggle button
                                                        <Form.Check
                                                            type="switch"
                                                            id='host-switch'
                                                            label="Host"
                                                            onClick={e => setShowHostConfirmation(!showHostConfirmation)}
                                                        />}
                                                </div>
                                            </div>

                                        </form>

                                        <AddPropertyModal propertyDetails={emptyPropertyDetails} showNewPropertyModal={showNewPropertyModal} cancelNewPropertyModal={cancelNewPropertyModal} />
                                        <BecomeHostModal showHostConfirmation={showHostConfirmation} setShowHostConfirmation={setShowHostConfirmation} />
                                    </div>
                                </div>

                                {
                                    is_host ?
                                        <div className='container' id="host-proeprties-container">
                                            <ShowHostProperties propertiesList={propertiesList} />
                                        </div>
                                        : <> </>
                                }

                            </>
                    }
                </div >
            </div >
        </div >
    )
}

function renderUserProfilePhoto(profile_photo) {

    console.log("Rendering Image");
    // console.log(profile_photo);
    if (profile_photo === "") {
        return (
            <img
                src={defaultUserImage}
                alt='User profile'
                id='profile-picture'
            />
        )
    } else {
        return (
            <img
                src={"data:image/png;base64," + profile_photo}
                alt="User profile"
                id="profile-picture"
            />
        )
    }

}
export default Profile
