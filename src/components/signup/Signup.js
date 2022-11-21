import React, { useEffect, useState } from 'react'
import './Signup.css'
import { callSignupApi } from '../../services/LoginService'
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { renderCancelButton, renderSubmitButton } from '../common/CommonElements';
import { convertImageToBase64 } from '../common/CommonUtils';

const Signup = ({ showSignup, setShowSignup }) => {

    const fileFormats = 'image/*, .heic';
    const navigate = useNavigate();

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

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [userData, setUserData] = useState(userObject);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value.trim()
        })
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formErrors)
        }
    }, [formErrors]);

    const onSignupFormSubmit = async (e) => {
        console.log("Submitted Form")
        // console.log(userData);
        e.preventDefault()
        setFormErrors(validateForm(userData));
        setIsSubmit(true);
        if (Object.keys(validateForm(userData)).length === 0) {
            await callSignupApi(userData)
                .then((status) => {
                    if (status === 200) {
                        setShowSignup(false)
                    }
                }).then(
                    navigate('/login')
                )
        } else {
            console.log('invalid form');
        }
    }

    const addProfilePicture = async (event) => {
        const file = event.target.files[0]
        console.log(file);
        await convertImageToBase64(file)
            .then((data) => {
                setUserData({
                    ...userData,
                    profile_photo: data.split("base64,")[1]
                })
            })
    }

    const validateForm = (values) => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!values.first_name) {
            errors.first_name = "First name is required"
        }
        if (!values.last_name) {
            errors.last_name = "Last name is required"
        }
        if (!values.email_id) {
            errors.email_id = "Email is required"
        } else if (!emailRegex.test(values.email_id)) {
            errors.email_id = "Invalid Email"
        }

        if (!values.phone_no) {
            errors.phone_no = "Phone no is required"
        }
        if (!values.password) {
            errors.password = "Invalid Password"
        } else if (!passwordRegex.test(values.password)) {
            errors.password = "Min 8 chars - atleast 1 number, 1 alphabet and 1 special char"
        }
        if (!values.id_type) {
            errors.id_type = "Invalid id type"
        }
        if (!values.id_details) {
            errors.id_details = "Id details is required"
        }
        if (!values.description) {
            errors.description = "Description is required"
        }
        if (!values.languages) {
            errors.languages = "Language is required"
        }
        if (!values.profile_photo) {
            errors.profile_photo = "Profile Picture is required"
        }

        return errors;
    }

    return (

        <Modal show={showSignup} id='newPaymentModalId' backdrop='static' keyboard={true}>
            <Modal.Header /* closeButton */>
                <Modal.Title style={{ textAlign: 'center' }}>Register</Modal.Title>
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
                            <small className="error">{formErrors.first_name}</small>
                        </div>
                        <div className="col">
                            <input type="text"
                                className='form-control form-control-md'
                                placeholder='Last name'
                                required
                                name='last_name'
                                onChange={handleChange}
                            ></input>
                            <small className='error'>{formErrors.last_name}</small>
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
                            <small className="error">{formErrors.email_id}</small>
                        </div>
                        <div className="col">
                            <input type="tel"
                                className='form-control form-control-md'
                                placeholder='Phone no'
                                required
                                name="phone_no"
                                onChange={handleChange}
                            ></input>
                            <small className="error">{formErrors.phone_no}</small>
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
                            <small className="error">{formErrors.password}</small>
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
                            <small className="error">{formErrors.id_type}</small>
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
                            <small className="error">{formErrors.id_details}</small>
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
                            <small className="error">{formErrors.description}</small>
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
                            <small className="error">{formErrors.languages}</small>
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
                            <small className="error">{formErrors.profile_photo}</small>
                        </div>
                    </div>
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
