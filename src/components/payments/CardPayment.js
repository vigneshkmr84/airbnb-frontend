import React from 'react'
import './Payment.css'
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa, FaCreditCard } from 'react-icons/fa'

const CardPayment = () => {

    const creditCardDetails =
        [
            {
                "card_no": 987654321,
                "cvv": 888,
                "expiry_date": "2022-11-20",
                "created_at": "2022-08-31T08:05:32.279Z",
                "_id": "630f166e9509e1407342b2a7",
                "card_type": "visa"
            },
            {
                "card_no": 987654321,
                "cvv": 888,
                "expiry_date": "2022-11-20",
                "created_at": "2022-09-01T20:58:25.539Z",
                "_id": "63111d7443cf550baff50306",
                "card_type": "mastercard"
            },
            {
                "card_no": 987654321,
                "cvv": 888,
                "expiry_date": "2022-11-20",
                "created_at": "2022-09-01T20:58:25.539Z",
                "_id": "63111d7443cf550baff50306",
                "card_type": "discover"
            },
            {
                "card_no": 987654321,
                "cvv": 888,
                "expiry_date": "2022-11-20",
                "created_at": "2022-09-01T20:58:25.539Z",
                "_id": "63111d7443cf550baff50306",
                "card_type": "credit"
            },
        ]

    return (

        <div /* id='credit-card-details' */>
            {creditCardDetails.map((cardDetails => {
                return (
                    <div key={cardDetails._id}>
                        <div id='credit-card-details' className={cardDetails.card_type}>
                            <div className='row' style={{ marginRight: '15px', marginBottom: '15px' }}>
                                <div className='col-md-12' style={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <span>{cardDetails.card_no} </span>
                                    <span><b>Exp:</b> {cardDetails.expiry_date}</span>

                                    <span>
                                        {cardDetails.card_type === "credit" || cardDetails.card_type === "debit" ? <FaCreditCard /> :
                                            cardDetails.card_type === "amex" ? <FaCcAmex /> :
                                                cardDetails.card_type === "mastercard" ? <FaCcMastercard /> :
                                                    cardDetails.card_type === "visa" ? <FaCcVisa /> :
                                                        cardDetails.card_type === "discover" ? <FaCcDiscover /> : <FaCreditCard />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <br></br>
                    </div>

                )
            }))}
        </div>
    )
}

export default CardPayment