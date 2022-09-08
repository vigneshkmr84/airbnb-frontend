import React from 'react'
import { Modal, Button } from "react-bootstrap";
import './Payment.css'
import { useState } from "react";

const AddNewPayment = ({ showNewPaymentModal, onClose }) => {

    const [displayPaypal, setDisplayPaypal] = useState(false);
    const [displayCard, setDisplayCard] = useState(false);

    const handlePaymentTypeChange = (event) => {
        console.log("Actual value received : " + event.target.value)
        console.log('Card ' + displayCard);
        console.log('Paypal ' + displayPaypal);
        if (event.target.value.trim() == 'card') {
            setDisplayCard(true);
            setDisplayPaypal(false);
        } else if (event.target.value.trim() == 'paypal') {
            setDisplayPaypal(true);
            setDisplayCard(false);
            console.log('paypal')
        } else {
            console.log('none')
            setDisplayPaypal(false);
            setDisplayCard(false);
        }
        console.log('Card ' + displayCard);
        console.log('Paypal ' + displayPaypal);
    }

    const closeButtonClickHandler = () => {
        // onClose is the variable 
        // which holds the reference 
        // to the function in parent ie. cancelNewCardModal
        onClose()
    }

    return (
        <Modal show={showNewPaymentModal} id='newPaymentModalId' backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className='form-label'>Payment Type </label>
                    <select className="form-select"
                        aria-label="Select Payment Type"
                        name="payment_type" required
                        onChange={handlePaymentTypeChange}
                        defaultValue={""}>
                        <option value="">Select Payment Type</option>
                        <option value="card">Credit / Debit Card</option>
                        <option value="paypal">Paypal</option>
                    </select>
                </div>

                {displayCard ? <NewCardPaypment /> : null}
                {displayPaypal ? <NewPaypalPaypment /> : null}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" /* onClick={submitNewPayment} */>
                    Submit
                </Button>
                <Button variant="secondary" onClick={closeButtonClickHandler}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const NewPaypalPaypment = () => {
    return (
        <form className='form-group container was-validated' id='newpaypal-container' noValidate >
            <div className='form-group'>
                <label className='form-label control-label'>Paypal Account Email-id</label>
                <input type="email"
                    className='form-control form-control-md'
                    placeholder='Paypal Email-id' required
                    name="account_name"
                //onChange={handleChange}
                ></input>
            </div>

            <div className='form-group'>
                <label className='form-label control-label'>Nick name</label>
                <input type="text"
                    className='form-control form-control-md'
                    placeholder='Nick name' required
                    name="nick_name"
                //onChange={handleChange}
                ></input>
            </div>
        </form>
    )
};

const NewCardPaypment = () => {
    return (
        <form className='form-group container was-validated'
            id='newcard-container'
            noValidate
        >
            <div className="form-group">
                <label className='form-label'>Card Type</label>
                <select className="form-select"
                    aria-label="Select Card Type"
                    name="card_type" required
                    //onChange={handleChange}
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
                    placeholder='Credit / Debit Card no' required
                    name="card_no"
                //onChange={handleChange}
                ></input>

            </div>
            <div className="form-group">
                <label className='form-label'>Cvv</label>
                <input type="password"
                    className='form-control form-control-md'
                    placeholder='Cvv' required
                    name='cvv'
                //onChange={handleChange}
                ></input>
            </div>
            <div className="form-group">
                <label className='form-label'>Expiry Date </label>
                <input type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    className='form-control form-control-md datepicker'
                    placeholder='Expiry Date' required
                    name="expiry_date"
                //onChange={handleChange}
                ></input>
            </div>

            <div className="form-group">
                <label className='form-label'>Nick name </label>
                <input type="text"
                    className='form-control form-control-md'
                    placeholder='Nick name' required
                    name="nick_name"
                //onChange={handleChange}
                ></input>
            </div>
            <br></br>
        </form >
    )
};

export default AddNewPayment
