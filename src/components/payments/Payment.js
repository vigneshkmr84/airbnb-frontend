import React, { useEffect, useState } from 'react'
import { getUserPaymentDetails } from '../../services/PaymentService';
import Sidebar from '../sidebar/Sidebar'
// import CardPayment from './CardPayment';
import './Payment.css';
// import Paypal from './Paypal';
import AddNewPayment from './AddNewPayment';
import { Accordion } from 'react-bootstrap';
import editButton from 'react-bootstrap/Button';
import moment from 'moment-timezone';

const Payment = () => {

    const defaultPaymentDetails = {
        _id: '',
        credit_card: [],
        paypal: [],
    }

    const [displayPaypal, setDisplayPaypal] = useState(false);
    const [displayCard, setDisplayCard] = useState(false);

    // const [paymentDetails, setPaymentDetails] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState(defaultPaymentDetails);

    useEffect(() => {
        getUserPaymentDetails('630d9e1a5a8e270b69c8e947')
            .then((res) => {
                // console.log("Inside use effect method");
                setPaymentDetails(res);
            });
        /* console.log(paymentDetails.credit_card)
        console.log(paymentDetails.paypal) */
    }, []);

    const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);

    const cancelNewPaymentModal = () => {
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
                    <div className='row'>
                        <div className='col-md-6'></div>
                        <div className='col-md-6'>
                            <button type="button"
                                id="new-payment"
                                className="btn btn-success btn-lg"
                                // style={{ width: '120px' }}
                                onClick={() => setShowNewPaymentModal(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                                New Payment
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div id="allCardDetails">
                    <h3>Credit Card Details</h3>

                    <CardPayment creditCardDetails={paymentDetails} onClose={cancelNewPaymentModal} />

                </div>

                <div id="allPaypalDetails">
                    <h3>Paypal Details</h3>
                    <Paypal />
                </div> */}

                <div id="paymentDetails">
                    {/* <h3> Payment Details </h3> */}
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Credit / Debit</Accordion.Header>
                            <Accordion.Body>
                                {
                                    paymentDetails.credit_card.map(credit_card => {
                                        return (
                                            <div className='row' id='credit_card_details' key={credit_card._id} >

                                                <div className='col-md-4'>
                                                    <p>
                                                        {/* Logo will be picked up from public folder
                                                                react will know this by default
                                                            */}
                                                        <img src={`./payment_images/${credit_card.card_type}.svg`} alt='credit_card' id={credit_card.card_type} />
                                                    </p>
                                                </div>
                                                <div className='col-md-4'>
                                                    <p>{credit_card.card_no}</p>
                                                </div>
                                                <div className='col-md-4'>
                                                    <p>{moment(credit_card.expiry_date).format('YYYY-mm-dd')}</p>
                                                </div>
                                                {/* svg for delete icon */}
                                                {/* <div className='col-md-4'>
                                                    <button className='btn btn-primary-sm'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </button>
                                                </div> */}
                                            </div>

                                        )
                                    }
                                    )
                                }

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Paypal</Accordion.Header>
                            <Accordion.Body>

                                {
                                    paymentDetails.paypal.map(paypal => {
                                        return (
                                            <div className='row' id='paypal_details' key={paypal._id} >

                                                <div className='col-md-4'>
                                                    <p>
                                                        <img src={`./payment_images/paypal.svg`} alt='paypal' id='paypal' />
                                                    </p>
                                                </div>
                                                <div className='col-md-4'>
                                                    <p>{paypal.nick_name}</p>
                                                </div>
                                                <div className='col-md-4'>
                                                    <p>{paypal.account_name}</p>

                                                </div>
                                                {/* svg for delete icon */}
                                                {/* <div className='col-md-4'>
                                                    <button className='btn btn-primary-sm'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </button>
                                                </div> */}
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>

                <AddNewPayment showNewPaymentModal={showNewPaymentModal} onClose={cancelNewPaymentModal} user_id='630d9e1a5a8e270b69c8e947' />

            </div>
        </div >
    )
}

/* const NewCardPaypment = () => {
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
}; */

export default Payment
