import React, { useEffect, useState } from 'react'
import { getUserPaymentDetails } from '../../services/PaymentService';
import Sidebar from '../sidebar/Sidebar'
import './Payment.css';
import AddNewPayment from './AddNewPayment';
import { Accordion } from 'react-bootstrap';
import CreditCard from './CreditCard';
import Paypal from './Paypal';
import { getUserId } from '../common/CommonUtils';

const Payment = () => {

    const defaultPaymentDetails = {
        _id: '',
        credit_card: [],
        paypal: [],
    }

    const [displayPaypal, setDisplayPaypal] = useState(false);
    const [displayCard, setDisplayCard] = useState(false);
    const user_id = getUserId();
    const [paymentDetails, setPaymentDetails] = useState(defaultPaymentDetails);

    useEffect(() => {

    })
    useEffect(() => {
        getUserPaymentDetails(user_id)
            .then((res) => {
                setPaymentDetails(res);
                console.log(res);
            });
    }, {});

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
        if (event.target.value.trim() === 'card') {
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
                                className="btn btn-success btn-lg  w-25"
                                onClick={() => setShowNewPaymentModal(true)}
                            >
                                <i className="bi bi-plus-lg"></i>&nbsp;&nbsp;Add New

                            </button>
                        </div>
                    </div>
                </div>

                <div id="paymentDetails">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Credit / Debit</Accordion.Header>
                            <Accordion.Body>

                                {paymentDetails.credit_card === undefined || paymentDetails.credit_card === null || paymentDetails.credit_card.length === 0
                                    ? renderNoData()
                                    :
                                    <CreditCard credit_card={paymentDetails.credit_card} />
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Paypal</Accordion.Header>
                            <Accordion.Body>
                                {paymentDetails.paypal === undefined || paymentDetails.paypal.length === 0
                                    ? renderNoData()
                                    : <Paypal paypal_details={paymentDetails.paypal} />
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>

                <AddNewPayment showNewPaymentModal={showNewPaymentModal} onClose={cancelNewPaymentModal} user_id={user_id} />

            </div>
        </div >
    )
}

const renderNoData = () => {
    return (
        <h6>No Data Present.</h6>
    )
}

export default Payment
