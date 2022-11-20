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
    const stringFieldsToValidate = ["name", "description", "one_liner", "location", "img", "cancellation_policy", "host_id", "house_type"];

    const [formData, setFormData] = useState(emptyFormData);

    const validateForm = () => {
        console.log("Validating Form");
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
        if (validateForm()) {
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
            Toast('Invalid Property Details', 'error');
        }
    }

    return (
        <Modal show={showNewPropertyModal} id='addNewProperty' backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: 'center' }}>List a Property</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepProgress formData={formData} setFormData={setFormData} propertyImages={propertyImages} setPropertyImages={setPropertyImages} />
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
