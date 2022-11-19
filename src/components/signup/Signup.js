import React, { useState } from 'react'
import './Signup.css'
import { callSignupApi } from '../../services/LoginService'
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { renderCancelButton, renderSubmitButton } from '../common/IconButtons';
import { convertImageToBase64 } from '../common/CommonUtils';

const Signup = ({ showSignup, setShowSignup }) => {

    const fileFormats = 'image/*, .heic';

    const userObject = Object.freeze({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_no: "",
        password: "",
        id_type: "",
        id_details: "",
        description: "",
        languages: "",
    });

    const [userData, updateFormData] = useState(userObject);

    const handleChange = (e) => {
        updateFormData({
            ...userData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const navigate = useNavigate();

    const onSignupFormSubmit = async (e) => {
        console.log("Submitted Form")
        console.log(userData);
        e.preventDefault()

        await callSignupApi(userData).then((status) => {
            if (status === 200) {
                setShowSignup(false)
            }
        }).then(
            navigate('/login')
        );


        ;
    }

    const addProfilePicture = async (event) => {
        const file = event.target.files[0]
        console.log(file);
        await convertImageToBase64(file)
            .then((data) => {
                updateFormData({
                    ...userData,
                    ["profile_photo"]: data.split("base64,")[1]
                })
            })
    }

    const isEnabled = (userData.first_name !== "") && (userData.last_name !== "")
        && (userData.email_id !== "") && (userData.phone_no !== "") && (userData.password !== "")
        && (userData.id_type !== "") && (userData.id_details !== "");



    return (

        <Modal show={showSignup} id='newPaymentModalId' backdrop='static' keyboard={false}>
            <Modal.Header /* closeButton */>
                <Modal.Title style={{ textAlign: 'center' }}>Create a new account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <input type="text"
                                className='form-control form-control-md'
                                placeholder='First name'
                                required
                                name="first_name"
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div className="col">
                            <input type="text"
                                className='form-control form-control-md'
                                placeholder='Last name'
                                required
                                name='last_name'
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col">
                            <input type="email"
                                className='form-control form-control-md'
                                placeholder='Email-id'
                                required
                                name="email_id"
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div className="col">
                            <input type="tel"
                                className='form-control form-control-md'
                                placeholder='Phone no'
                                required
                                name="phone_no"
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <input type="Password"
                                className='form-control form-control-md'
                                placeholder='Password'
                                required
                                name="password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <select 
                                className="form-select"
                                aria-label="Select ID type"
                                name="id_type"
                                required
                                onChange={handleChange}
                                defaultValue={""}>
                                <option value="">Select Id Type</option>
                                <option value="passport">Passport</option>
                                <option value="state id card">State id card</option>
                                <option value="driver license">Driver License</option>
                            </select>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <input type="text"
                                className='form-control form-control-md'
                                placeholder='Valid Id no'
                                required
                                name="id_details"
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <input type="text"
                                className='form-control form-control-md'
                                placeholder='Description about you'
                                required
                                name="description"
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <input type="text"
                                className='form-control form-control-md'
                                placeholder='Languages'
                                required
                                name="languages"
                                onChange={handleChange}
                            ></input>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <input
                                type="file"
                                accept={fileFormats}
                                className='form-control form-control-md'
                                placeholder='Upload a Profile Picture'
                                required
                                name="profile_picture"
                                onChange={e => addProfilePicture(e)}
                            ></input>
                        </div>
                    </div>
                    {/* <div className='row'>
                        <div className='col'>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>

                        </div>
                    </div> */}
                </div>



            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>
                <button
                    className='btn btn-secondary btn-md'
                    onClick={() => setShowSignup(false)}>
                    {renderCancelButton()}

                </button>
                <button
                    className='btn btn-success btn-md'
                    onClick={onSignupFormSubmit}>
                    {renderSubmitButton()}
                </button>
            </Modal.Footer>
        </Modal>


    )
}

export default Signup
