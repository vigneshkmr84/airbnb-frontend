import React, { useEffect, useState } from 'react'
import { getUserPaymentDetails } from '../../services/PaymentService';
import Sidebar from '../sidebar/Sidebar'
import CardPayment from './CardPayment';
import './Payment.css';
import Paypal from './Paypal';
import { Modal, Button } from 'react-bootstrap';
import NewCard from './NewCard';

const Payment = () => {

    const creditCardDetails =
        [
            {
                "card_no": 987654321,
                "cvv": 888,
                "expiry_date": "2022-11-20T18:05:45.000Z",
                "created_at": "2022-08-31T08:05:32.279Z",
                "_id": "630f166e9509e1407342b2a7"
            },
            {
                "card_no": 987654321,
                "cvv": 888,
                "expiry_date": "2022-11-20T18:05:45.000Z",
                "created_at": "2022-09-01T20:58:25.539Z",
                "_id": "63111d7443cf550baff50306"
            },
        ]

    /* var creditCardList = [];
    creditCardList = creditCardDetails.forEach((item, index) => {
        creditCardList.push(<li key={index}>{item.card_no}</li>)
    }) */

    const defaultPaymentDetails = {
        _id: '',
        credit_card: [],
        paypal: [],
    }

    const [displayPaypal, setDisplayPaypal] = useState(false);
    const [displayCard, setDisplayCard] = useState(false);

    const [paymentDetails, setPaymentDetails] = useState([]);

    useEffect(() => {
        getUserPaymentDetails('630d9e1a5a8e270b69c8e947')
            .then((res) => {
                // console.log(res);
                setPaymentDetails(res);
            });
    }, []);

    const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);

    const cancelNewCardModal = () => {
        setShowNewPaymentModal(false)
    }

    // submit a new payment to the backend
    const submitNewPayment = async (e) => {
        console.log("Create new Payment")
        e.preventDefault()
    }

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

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            <div id='payment-container' style={{ width: '100%' }}>
                <div className="container rounded bg-white mt-5 mb-5">
                    <h1 className='paymentHeading'>Payment Details</h1>
                    <div className='col-md-6'>
                        <button type="button"
                            id="new-payment"
                            className="btn btn-primary btn-lg"
                            style={{ width: '120px' }}
                            onClick={() => setShowNewPaymentModal(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            Add New Payment
                        </button>
                    </div>
                </div>
                <div id="allCardDetails">
                    <h3>Credit Card Details</h3>

                    <CardPayment creditCardDetails={paymentDetails} />

                </div>

                <div id="allPaypalDetails">
                    <h3>Paypal Details</h3>

                    <Paypal />

                    <br></br>
                    <br></br>

                </div>
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
                        <Button variant="secondary" onClick={cancelNewCardModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    )
}

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

export default Payment
