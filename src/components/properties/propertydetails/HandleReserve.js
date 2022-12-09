import React from 'react'
import { Accordion, Offcanvas } from 'react-bootstrap';

const HandleReserve = ({ show, handleClose, handleBookingFormChange, propertyDetails, bookingFare, userPaymentNickNames, bookingFormData, onSubmitBooking, errorBookingFormData }) => {
    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            placement='end'
            name='Reserve'
            className="me-2"
            scroll={true}
            backdrop={false}
            style={{ backgroundColor: '#eeeeee', width: '30%' }}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title style={{ paddingLeft: '40%' }}>

                    <h3 className='reserveFormHeader'>Reserve</h3>

                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='container' id='reserveForm'>

                    <div className='row'>
                        <div className='col-md-6'>
                            <label className='form-label control-label'>Checkin date</label>
                            <input type='date'
                                className='form-control mr-sm-2'
                                placeholder='Check-in'
                                min={new Date().toISOString().slice(0, 10)}
                                onChange={handleBookingFormChange}
                                name='start_date'
                            />
                            <small className='error'>{errorBookingFormData.start_date}</small>
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label control-label'>Checkout date</label>
                            <input type='date'
                                className='form-control mr-sm-2'
                                placeholder='Check-out'
                                min={new Date(new Date().valueOf() + 86400000).toISOString().slice(0, 10)}
                                onChange={handleBookingFormChange}
                                name='end_date'
                            />
                            <small className='error'>{errorBookingFormData.end_date}</small>
                        </div>
                    </div>
                    <div className='row' >
                        <div className='col-md-12'>
                            <label className='form-label control-label'>Guests</label>
                            <input type='number'
                                className='form-control mr-sm-2'
                                placeholder='Guests'
                                onChange={handleBookingFormChange}
                                name='no_of_people'
                                min={1}
                                max={propertyDetails.guests}
                            />
                            <small className='error'>{errorBookingFormData.no_of_people}</small>
                        </div>
                    </div>
                    <div className='row' >
                        <div className='col-md-12'>
                            <label className='form-label control-label'>Message to Host</label>
                            <textarea type='text'
                                className='form-control mr-sm-2'
                                placeholder='Type your message...'
                                onChange={handleBookingFormChange}
                                name='guest_message'
                                style={{ height: '120px' }}
                            />
                        </div>
                    </div>
                    <div className='row' >
                        <div className='col-md-12'>
                            <label className='form-label control-label'>Select Payment Method</label>
                            <select className="form-select"
                                aria-label="Select Payment Type"
                                name="payment_type"
                                required
                                onChange={handleBookingFormChange}
                                defaultValue={""}>
                                <option value="">Select Payment Type</option>
                                <option value="credit">Credit / Debit Card</option>
                                <option value="paypal">Paypal</option>
                            </select>
                            <small className='error'>{errorBookingFormData.payment_type}</small>
                        </div>
                    </div>
                    <div className='row' >
                        <div className='col-md-12'>
                            <label className='form-label control-label'>Select Payment</label>
                            <select className="form-select"
                                aria-label="Select Payment"
                                name="payment_details_id"
                                required
                                onChange={handleBookingFormChange}
                                defaultValue={""}>
                                <option value="">Select Payment</option>

                                {
                                    bookingFormData.payment_type === 'credit' ?
                                        userPaymentNickNames?.credit_card.map((card => {
                                            return (
                                                <option key={card._id} id={card._id}>{card.nick_name}</option>
                                            )
                                        })
                                        )
                                        :
                                        userPaymentNickNames?.paypal.map((paypal => {
                                            return (
                                                <option key={paypal._id} id={paypal._id}>{paypal.nick_name}</option>
                                            )
                                        })
                                        )
                                }
                            </select>
                            <small className='error'>{errorBookingFormData.payment_details_id}</small>
                        </div>
                    </div>
                    <div className='row' style={{ textAlign: 'center' }}>
                        <div className='col-lg-6'>
                            <button
                                className="btn btn-danger btn-md"
                                type="button"
                                id='cancelButton'
                                onClick={handleClose}
                            > Cancel
                            </button>
                        </div>
                        <div className='col-lg-6'>
                            <button
                                className="btn btn-primary btn-md"
                                type="button"
                                id='reserveButton'
                                onClick={onSubmitBooking}
                            > Reserve
                            </button>
                        </div>
                        <hr style={{ margin: '1rem 0', border: 0, color: 'red' }} />
                    </div>

                    {/* Fare Split up */}
                    <div className='row'>

                    </div>
                    {/* <div className='row'>
                        <Accordion>
                            <Accordion.Item eventKey='description'>
                                <Accordion.Header><h6>Fare Splitup</h6></Accordion.Header>
                                <Accordion.Body>
                                    <p>Service Cost :  ${propertyDetails.service_cost}</p>
                                    <p>Cleaning Cost : ${propertyDetails.cleaning_cost}</p>
                                    {
                                        !isNaN(parseFloat(bookingFare.nights)) ?
                                            <>
                                                <p> {bookingFare.nights} x ${propertyDetails.cost_per_day} : ${bookingFare.cost} </p>
                                                <p>Taxes: ${bookingFare.taxes}</p>
                                                <p>Total Cost: ${bookingFare.total_price}</p>
                                            </>
                                            : null
                                    }


                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </div> */}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default HandleReserve