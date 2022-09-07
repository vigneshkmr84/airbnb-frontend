import React, { useEffect, useState } from 'react'
import { getUserPaymentDetails } from '../../services/PaymentService';
import Sidebar from '../sidebar/Sidebar'
import CardPayment from './CardPayment';
import './Payment.css';
import Paypal from './Paypal';

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

    var creditCardList = [];
    creditCardList = creditCardDetails.forEach((item, index) => {
        creditCardList.push(<li key={index}>{item.card_no}</li>)
    })

    /* const defaultPaymentDetails = {
        credit_card: [],
        paypal: [],
    } */

    const [paymentDetails, setPaymentDetails] = useState('');

    /* useEffect(() => {
        getUserPaymentDetails('630d9e1a5a8e270b69c8e947')
            .then((res) => {
                setPaymentDetails(res);
            });
    }, defaultPaymentDetails); */

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
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            New
                        </button>
                    </div>
                    {/* <button type="button" class="btn btn-primary"><span class="bi bi-plus"></span> Sample Button</button> */}
                </div>
                <div id="allCardDetails">
                    <h3>Credit Card Details</h3>

                    <CardPayment />

                </div>

                <div id="allPaypalDetails">
                    <h3>Paypal Details</h3>

                    <Paypal />

                    <br></br>
                    <br></br>

                </div>
            </div>
        </div>
    )
}

export default Payment