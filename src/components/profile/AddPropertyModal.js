import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './AddPropertyModal.css';
import StepProgress from './StepProgress';
import { addNewProperty } from '../../services/PropertiesService';
import moment from 'moment-timezone';
import { getUserId as getUserIdFromCookies } from '../common/CommonUtils';

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
        cancellation_policy: "test policy",
        host_id: "",
    }

    const [formData, setFormData] = useState(emptyFormData);

    // POST call to submit new property
    const submitProperty = () => {
        console.log('Adding new property');

        let in_time = parseInt(formData.checkin_time.format("HHmm"));
        let out_time = parseInt(formData.checkout_time.format("HHmm"));

        let newData = formData;
        newData.checkin_time = in_time;
        newData.checkout_time = out_time;
        newData.host_id = getUserIdFromCookies();

        console.log(newData);
        addNewProperty(newData);
        cancelNewPropertyModal();
        setFormData(emptyFormData);
    }

    return (
        <Modal show={showNewPropertyModal} id='addNewPaymentId' backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: 'center' }}>List a Property</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepProgress formData={formData} setFormData={setFormData} />
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>

                <button className='btn btn-secondary btn-md' onClick={() => cancelNewPropertyModal()}>
                    Cancel
                </button>
                <button className='btn btn-danger btn-md' onClick={submitProperty}>
                    Submit
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddPropertyModal