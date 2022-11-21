import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import { addPaymentDetails } from '../../services/PaymentService';
import { renderCancelButton, renderSubmitButton } from '../common/CommonElements';
import './Payment.css'

const AddNewPayment = ({ showNewPaymentModal, onClose, user_id }) => {

    const [displayPaypal, setDisplayPaypal] = useState(false);
    const [displayCard, setDisplayCard] = useState(false);

    const [newPaymentDetails, setNewPaymentDetails] = useState({});
    const [paymentType, setPaymentType] = useState('');

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(newPaymentDetails)
        }
    }, [formErrors]);

    const validateForm = (values, payment_type) => {
        const errors = {}
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!payment_type) {
            errors.payment_type = "Payment Type is required"
        }

        if (payment_type === 'credit') {

            if (!values.card_type) {
                errors.card_type = "Card Type is required"
            }

            if (!values.card_no) {
                errors.card_no = "Card no is required"
            }

            if (!values.cvv) {
                errors.cvv = "CVV is required"
            } else if (values.cvv.length > 4 && values.cvv.length < 3) {
                errors.cvv = "Cvv should be 3 or 4 char only"
            }

            if (!values.expiry_date) {
                errors.expiry_date = "Expiry date is required"
            }

            if (!values.nick_name) {
                errors.nick_name = "Nick name is required"
            }
        } else {
            if (!values.account_name) {
                errors.account_name = "Valid Paypal email-id is required"
            } else if (!emailRegex.test(values.account_name)) {
                errors.account_name = "Invalid Email"
            }

            if (!values.nick_name) {
                errors.nick_name = "Nick name is required"
            }
        }

        return errors;
    }

    const handlePaymentTypeChange = (event) => {
        console.log("Actual value received : " + event.target.value)

        setPaymentType(event.target.value.trim());
        if (event.target.value.trim() === 'credit') {
            setDisplayCard(true);
            setDisplayPaypal(false);
        } else if (event.target.value.trim() === 'paypal') {
            setDisplayPaypal(true);
            setDisplayCard(false);
            console.log('paypal')
        } else {
            console.log('none')
            setDisplayPaypal(false);
            setDisplayCard(false);
        }
    }

    const handleChange = (e) => {
        setNewPaymentDetails({
            ...newPaymentDetails,
            // dynamically map the name and value of the form data
            // name attribute has to be set on each element - else it will not work
            [e.target.name]: e.target.value.trim()
        });
    }

    const submitNewPayment = async (e) => {
        console.log("Submit Payment");
        e.preventDefault()
        setFormErrors(validateForm(newPaymentDetails, paymentType))
        setIsSubmit(true);
        console.log(newPaymentDetails);

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log('Valid details')
            await addPaymentDetails(user_id, paymentType, newPaymentDetails)
                .then((status) => {
                    if (status === 200) {
                        onClose()
                    }
                })
        } else {
            console.log('invalid form');
            console.log(Object.keys(formErrors).length)
            console.log(formErrors)
        }

    }

    return (
        <Modal show={showNewPaymentModal} id='newPaymentModalId' backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: 'center' }}>Add New Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <label className='form-label'>Payment Type </label>
                    <select className="form-select"
                        aria-label="Select Payment Type"
                        name="payment_type"
                        required
                        onChange={handlePaymentTypeChange}
                        defaultValue={""}
                    >
                        <option value="">Select Payment Type</option>
                        <option value="credit">Credit / Debit Card</option>
                        <option value="paypal">Paypal</option>
                    </select>
                </div>

                {displayCard ? <NewCardPaypment handleChange={handleChange} formErrors={formErrors} /> : null}
                {displayPaypal ? <NewPaypalPaypment handleChange={handleChange} formErrors={formErrors} /> : null}

            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>
                <button className='btn btn-secondary btn-md' onClick={() => onClose()}>
                    {renderCancelButton()}
                </button>
                <button className='btn btn-primary btn-md' onClick={submitNewPayment}>
                    {renderSubmitButton()}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

const NewPaypalPaypment = ({ handleChange, formErrors }) => {

    return (
        // <form className='form-group container was-validated' id='newpaypal-container' noValidate >
        <>
            <div className='form-group'>
                <label className='form-label control-label'>Paypal Account Email-id</label>
                <input type="email"
                    className='form-control form-control-md'
                    placeholder='Paypal Email-id'
                    required
                    name="account_name"
                    onChange={handleChange}
                ></input>
                <small className="error">{formErrors.account_name}</small>
            </div>

            <div className='form-group'>
                <label className='form-label control-label'>Nick name</label>
                <input type="text"
                    className='form-control form-control-md'
                    placeholder='Nick name'
                    required
                    name="nick_name"
                    onChange={handleChange}
                ></input>
                <small className="error">{formErrors.nick_name}</small>
            </div>
            {/* </form> */}
        </>
    )
};

const NewCardPaypment = ({ handleChange, formErrors }) => {
    return (
        // <form className='form-group container was-validated' id='newcard-container' noValidate >
        <>
            <div className="form-group">
                <label className='form-label'>Card Type</label>
                <select className="form-select"
                    aria-label="Select Card Type"
                    name="card_type"
                    required
                    onChange={handleChange}
                    defaultValue={""}>
                    <option value="">Select Card Type</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">MasterCard</option>
                    <option value="amex">Amex</option>
                    <option value="discover">Discover</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
            </div>
            <div className='form-group'>
                <label className='form-label control-label'>Card no</label>
                <input type="text"
                    className='form-control form-control-md'
                    placeholder='Credit / Debit Card no'
                    required
                    name="card_no"
                    onChange={handleChange}
                ></input>
                <small className="error">{formErrors.card_no}</small>
            </div>
            <div className="form-group">
                <label className='form-label'>Cvv</label>
                <input type="password"
                    className='form-control form-control-md'
                    placeholder='Cvv'
                    required
                    name='cvv'
                    onChange={handleChange}
                ></input>
                <small className="error">{formErrors.cvv}</small>
            </div>
            <div className="form-group">
                <label className='form-label'>Expiry Date </label>
                <input type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    className='form-control form-control-md datepicker'
                    placeholder='Expiry Date'
                    required
                    name="expiry_date"
                    onChange={handleChange}
                ></input>
                <small className="error">{formErrors.expiry_date}</small>
            </div>

            <div className="form-group">
                <label className='form-label'>Nick name </label>
                <input type="text"
                    className='form-control form-control-md'
                    placeholder='Nick name'
                    required
                    name="nick_name"
                    onChange={handleChange}
                ></input>
                <small className="error">{formErrors.nick_name}</small>
            </div>
            <br></br>
            {/* </form > */}
        </>
    )
};

export default AddNewPayment
