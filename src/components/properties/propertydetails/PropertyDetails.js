import React, { useEffect, useState } from 'react';
import './PropertyDetails.css';
import Sidebar from '../../sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { getPropertyById, getPropertyImages } from '../../../services/PropertiesService';
import PropertyImagesDisplay from './PropertyImagesDisplay';
import BodyDetailsAccordion from './BodyDetailsAccordion';
import { getReviewsForPropertyId } from '../../../services/ReviewsService';
import { getUserProfile } from '../../../services/ProfileService';
import { Accordion, Offcanvas, Spinner } from 'react-bootstrap';
import moment from 'moment-timezone';
import { getUserPaymentDetails } from '../../../services/PaymentService';
import { addBooking } from '../../../services/BookingService';



const PropertyDetails = () => {
    let property_id = useParams();
    // let property_id = '631abfd2ff027fd82e85f6e0';

    const [propertyDetails, setPropertyDetails] = useState(null);
    const [propertyTopReviews, setPropertyTopReviews] = useState(null);
    const [hostDetails, setHostDetails] = useState(null);

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const [userPaymentNickNames, setUserPaymentNickNames] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log("Show enabled");
        getUserPaymentDetails('630d9e1a5a8e270b69c8e947', true)
            .then((res) => {
                setUserPaymentNickNames(res)
            });

        console.log(userPaymentNickNames);
        setShow(true)
    };

    // console.log(property_id);

    const initialBookindData = Object.freeze({
        start_date: '',
        end_date: '',
        no_of_people: Number.NaN,
        guest_message: ''
    })

    const [bookingFormData, setBookingFormData] = useState(initialBookindData);
    const tax_rate = 0.05;

    const [bookingFare, setBookingFare] = useState({
        cost: 0,
        taxes: 0,
        // nights: 1,
        nights: Number.NaN,
        total_price: 0,
    })

    // submit button toggle based on input validation
    const isSubmitEnabled =
        (initialBookindData.start_date !== "")
        && (initialBookindData.end_date !== "")
        && (initialBookindData.no_of_people !== "")
        && (initialBookindData.guest_message !== "");

    const handleBookingFormChange = (e) => {
        /*         console.log(e.target.value);
                console.log(isNaN(+e.target.value)); */
        setBookingFormData({
            ...bookingFormData,
            [e.target.name]: e.target.value.trim()
        });

        /* propertyDetails.cost_per_day * (moment.duration(
            moment(bookingFormData.end_date) - moment(bookingFormData.start_date)
        ).days() + 1) */

        let difference =
            moment.duration(
                moment(bookingFormData.end_date) - moment(bookingFormData.start_date)
            ).days() + 1;

        setBookingFare({
            ...bookingFare,
            cost: (difference * propertyDetails.cost_per_day),
            nights: difference,
            taxes: Math.round(bookingFare.cost * tax_rate * 100) / 100,
            // total_price: Math.round(bookingFare.cost + bookingFare.taxes * 100)/100,
            total_price: Math.round((difference * propertyDetails.cost_per_day) * (1 + tax_rate) * 100) / 100
        })
    }

    const onSubmitBooking = (e) => {
        console.log('Booking Form Submitted');
        // console.log(bookingFormData)
        var formData = bookingFormData;
        formData.property_id = property_id.id
        console.log(formData)
        addBooking(formData)

        // Call reserve Property API
    }

    // fetching the property details
    useEffect(() => {
        let isCalled = false
        console.log('fetching property details for id : ' + property_id.id)


        if (!isCalled) {
            getPropertyById(property_id.id)
                .then((res) => {
                    setPropertyDetails(res);
                });
        }
        console.log('Retrieved All property details');
        return () => {
            isCalled = true;
        }
    }, []);

    // fetching the top 5 reviews for the property
    useEffect(() => {

        async function apiCall() {
            await getReviewsForPropertyId(property_id.id, 1, 5)
                .then((res) => {
                    setPropertyTopReviews(res);
                });
        }

        apiCall();

        console.log(propertyTopReviews)
        console.log('Retrieved Top 5 Reviews');

        // console.log(propertyTopReviews);
    }, []);


    // fetching the host details 
    useEffect(() => {
        setLoading(true);
        getUserProfile('6316bca14fad5c24245666ca')
            .then((res) => {
                setHostDetails(res);
            }).finally(() => {
                setLoading(false);
            });


        console.log('Retrieved Host Details');

    }, []);

    return (

        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            {propertyDetails && hostDetails && propertyTopReviews &&
                <div id='property-details-container' style={{ width: '100%' }}>
                    <div className="container rounded bg-white mt-5 mb-5" >
                        <h1 className='propertyDetailsHeader'>{propertyDetails.name}</h1>
                        <div className='propertyDetailsBody'>

                            <div className='imagesBody'>
                                {/* {loading ? <p>Loading....</p> : <PropertyImagesDisplay />} */}
                                {loading ? <Spinner animation="grow" /> : <PropertyImagesDisplay />}

                            </div>

                            <div className='detailsBody'>

                                <br></br>
                                <br></br>
                                <div style={{ height: '10%' }}>
                                    <div className='row' style={{ margin: '0 auto', /* textAlign: 'center', */ backgroundColor: 'rgb(128 128 128 / 20%)', width: '70%', borderRadius: '9px', paddingTop: '2%', paddingLeft: '3%', paddingBottom: '1%' }}>
                                        {/* <div className='col-md-6'> */}
                                        <h5>{propertyDetails.one_line_description} Hosted by <a href={'/user/' + hostDetails._id}>{hostDetails.first_name} </a></h5>
                                        <p>{propertyDetails.no_of_people} guests &bull; {propertyDetails.bedroom} bedroom &bull; {propertyDetails.bathroom} bath</p>
                                        {/* </div> */}

                                        {/* <div className='col-md-6'>
                                        <img src={"data:image/svg+xml;base64," + hostDetails.profile_photo} alt="Profile Picture"
                                            style={{ objectFit: 'contain', width: '40%', height: '50%' }}
                                        />
                                        <h6><a href={'/user/' + hostDetails._id}>{hostDetails.first_name} {hostDetails.last_name}</a> </h6>
                                    </div> */}
                                    </div>
                                </div>
                                <br></br>
                                <div id='propertyDescription'>
                                    <BodyDetailsAccordion
                                        // property_details={propertyDetails}
                                        details={{
                                            property_details: propertyDetails
                                            , reviews: propertyTopReviews
                                            , hostDetails: hostDetails
                                            , property_id: property_id
                                        }}
                                    />
                                </div>

                                <div className='container-fluid'>

                                    <button className='btn btn-primary btn-lg' onClick={handleShow} id='reserveToggleButton'>
                                        Reserve
                                    </button>
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
                                            <form className='container was-validated' id='reserveForm'>
                                                {/* <h4 className='reserveFormHeader'>Reserve Property</h4> */}
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <label className='form-label control-label'>Checkin date</label>
                                                        <input type='date'
                                                            className='form-control mr-sm-2'
                                                            placeholder='Check-in'
                                                            min={new Date().toISOString().slice(0, 10)}
                                                            // defaultValue={new Date().toISOString().slice(0, 10)}
                                                            onChange={handleBookingFormChange}
                                                            name='start_date'
                                                        />
                                                    </div>

                                                    <div className='col-md-6'>
                                                        <label className='form-label control-label'>Checkout date</label>
                                                        <input type='date'
                                                            className='form-control mr-sm-2'
                                                            placeholder='Check-out'
                                                            min={new Date(new Date().valueOf() + 86400000).toISOString().slice(0, 10)}
                                                            // defaultValue={new Date(new Date().valueOf() + 2 * 86400000).toISOString().slice(0, 10)}
                                                            onChange={handleBookingFormChange}
                                                            name='end_date'
                                                        />
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
                                                            max={propertyDetails.no_of_people}
                                                        />
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
                                                    </div>
                                                </div>
                                                <div className='row' style={{ textAlign: 'center' }}>
                                                    <div className='col-lg-6' /* style={{ textAlign: 'center' }} */>
                                                        <button
                                                            className="btn btn-danger btn-md"
                                                            type="button"
                                                            id='cancelButton'
                                                            onClick={handleClose}
                                                        > Cancel
                                                        </button>
                                                    </div>
                                                    <div className='col-lg-6' /* style={{ textAlign: 'center' }} */>
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
                                                <div className='row'>
                                                    <Accordion>
                                                        <Accordion.Item eventKey='description'>
                                                            <Accordion.Header><h6>Fare Splitup</h6></Accordion.Header>
                                                            <Accordion.Body>
                                                                <p>Service Cost :  ${propertyDetails.service_cost}</p>
                                                                <p>Cleaning Cost : ${propertyDetails.cleaning_cost}</p>
                                                                {/* <p> {bookingFare.nights} x ${propertyDetails.cost_per_day} : ${bookingFare.cost} </p>
                                                                <p>Taxes: ${bookingFare.taxes}</p>
                                                                <p>Total Cost: ${bookingFare.total_price}</p> */}

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
                                                </div>
                                                {/* <div className='row'>
                                                    <div className='col-lg-12' id='calculatedValues'>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                ${propertyDetails.cost_per_day} x 12 nights
                                                            </div>
                                                            <div className='col-md-6'>
                                                                $1514
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                Cleaning fee
                                                            </div>
                                                            <div className='col-md-6'>
                                                                ${propertyDetails.cleaning_cost}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                Service fee
                                                            </div>
                                                            <div className='col-md-6'>
                                                                ${propertyDetails.cost_per_day}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <b>Total (before taxes)</b>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <b>${propertyDetails.cost_per_day}*2 + {propertyDetails.cleaning_cost} + {propertyDetails.service_cost}</b>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div> */}
                                            </form>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </div>

                                {/* uncomment the reservation form */}
                                {/* <div id='reservationFormDiv' className='col-6 col-lg-4'> </div> */}
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div >
            }
        </div >
    )
}

export default PropertyDetails