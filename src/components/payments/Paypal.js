import React from 'react'

const Paypal = ({ paypal_details }) => {
    return (
        // console.log(paypal_details);
        <div>
            {paypal_details?.map(paypal => {
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
                    </div>
                )
            }
            )
            }
        </div>
    )
}

export default Paypal