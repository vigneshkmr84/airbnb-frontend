import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './AddPropertyModal.css';
import StepProgress from './StepProgress';
import { addNewProperty, addPropertyImages } from '../../services/PropertiesService';
import moment from 'moment-timezone';
import { getUserId as getUserIdFromCookies } from '../common/CommonUtils';
import Toast from '../../components/toast/Toast';
import { renderCancelButton, renderSubmitButton } from '../common/CommonElements';

const AddPropertyModal = ({ showNewPropertyModal, cancelNewPropertyModal }) => {

    const emptyFormData =
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
        checkin_time: moment(new Date(2000, 1, 1, 0, 0, 0)),
        checkout_time: moment(new Date(2000, 1, 1, 0, 0, 0)),
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

    const [propertyImages, setPropertyImages] = useState([]);

    const [formData, setFormData] = useState(emptyFormData);
    const [propertyDataErrors, setPropertyDataErrors] = useState({});

    const validateForm = (values) => {
        const errors = {}
        if (!values.name) {
            errors.name = "Name is required"
        }

        if (!values.description) {
            errors.description = "Description is required"
        }

        if (!values.one_liner) {
            errors.one_liner = "One Liner is required"
        }

        if (!values.location) {
            errors.location = "Location is required"
        }

        if (!values.house_type) {
            errors.house_type = "House Type is required"
        }

        if (!values.cost_per_day) {
            errors.cost_per_day = "Cost is required"
        }

        if (!values.service_cost) {
            errors.service_cost = "Service Cost is required"
        }

        if (!values.cleaning_cost) {
            errors.cleaning_cost = "Cleaning Cost is required"
        }

        if (!values.latitude) {
            errors.latitude = "Latitude is required"
        }

        if (!values.longitude) {
            errors.longitude = "Longitude is required"
        }

        if (!values.guests) {
            errors.guests = "Guests is required"
        }

        if (!values.bedroom) {
            errors.bedroom = "Bedroom is required"
        }

        if (!values.bathroom) {
            errors.bathroom = "Bathroom is required"
        }

        if (!values.checkin_time) {
            errors.checkin_time = "Checkin time required"
        }

        if (!values.checkout_time) {
            errors.checkout_time = "Checkout required"
        }

        if (!values.img) {
            errors.img = "Image is required"
        }

        if (!values.cancellation_policy) {
            errors.cancellation_policy = "Cancellation Policy is required"
        }

        return true;
    }

    // POST call to submit new property
    const submitProperty = () => {
        console.log('Adding new property');

        console.log(propertyImages)
        let in_time = parseInt(formData.checkin_time.format("HHmm"));
        let out_time = parseInt(formData.checkout_time.format("HHmm"));

        let newData = formData;
        newData.checkin_time = in_time;
        newData.checkout_time = out_time;
        newData.host_id = getUserIdFromCookies();

        console.log(newData);
        setPropertyDataErrors(validateForm(newData));

        if (Object.keys(propertyDataErrors).length === 0) {
            addNewProperty(newData, propertyImages)
                .then(async res => {
                    console.log(res)
                    console.log('Submitting property images')
                    var response2 = await addPropertyImages(propertyImages, res.message)
                    if (response2.status === 200) {
                        Toast('Successfully Added', 'success');
                    } else {
                        Toast('Error in submitting property', 'error');
                    }
                })
            cancelNewPropertyModal();
            // setFormData(emptyFormData);
        } else {
            // Toast('Invalid Property Details', 'error');
            console.log('Invalid property details form.')
            console.log(propertyDataErrors);
        }
    }

    return (
        <Modal show={showNewPropertyModal} id='addNewProperty' backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: 'center' }}>List a Property</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepProgress formData={formData} setFormData={setFormData} propertyImages={propertyImages} setPropertyImages={setPropertyImages} propertyDataErrors={propertyDataErrors} />
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>

                <button className='btn btn-secondary btn-md' onClick={() => cancelNewPropertyModal()}>
                    {renderCancelButton()}
                </button>
                <button className='btn btn-primary btn-md' onClick={submitProperty}>
                    {renderSubmitButton()}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddPropertyModal
