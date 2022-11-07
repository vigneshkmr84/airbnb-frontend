import React, { Component, useEffect, useState } from 'react';
import './PropertyDetails.css';
import Sidebar from '../../sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { getPropertyById, getPropertyImages } from '../../../services/PropertiesService';
import PropertyImagesDisplay from './PropertyImagesDisplay';
import BodyDetailsAccordion from './BodyDetailsAccordion';
import { addUserReviewForProperty, getReviewsForPropertyId } from '../../../services/ReviewsService';
import { getUserProfile } from '../../../services/ProfileService';
import { Accordion, Button, Modal, Offcanvas, Spinner } from 'react-bootstrap';
import moment from 'moment-timezone';
import { getUserPaymentDetails } from '../../../services/PaymentService';
import { addBooking } from '../../../services/BookingService';
import HandleReserve from './HandleReserve';
import { getUserId } from '../../common/CommonUtils';



const PropertyDetails = () => {
    let property_id = useParams();

    const [propertyDetails, setPropertyDetails] = useState(null);
    const [propertyTopReviews, setPropertyTopReviews] = useState(null);
    const [hostDetails, setHostDetails] = useState(null);
    const [propertyImages, setPropertyImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        rating: 1,
        comments: "",
    });

    const [userPaymentNickNames, setUserPaymentNickNames] = useState(null);

    const handleClose = () => setShow(false);
    const onClickHandleReserveToggle = () => {
        console.log("Show enabled");
        // getUserPaymentDetails('630d9e1a5a8e270b69c8e947', true)
        getUserPaymentDetails(getUserId(), true)
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

    const [showReviewModal, setShowReviewModal] = useState(false);

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

    const submitReview = () => {
        console.log('Review submitted');
        console.log(reviewForm);
        addUserReviewForProperty(reviewForm, property_id.id)
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

        console.log('Fetching property details for id : ' + property_id.id)

        async function getData() {
            await getPropertyById(property_id.id)
                .then(async function (data) {
                    setPropertyDetails(data);
                    let host_id = data.host_id;
                    console.log('Fetching host details : ' + host_id);
                    await getUserProfile(host_id)
                        .then(host_data => {
                            setHostDetails(host_data);
                        })
                });
        }

        getData();

    }, []);

    // fetching the top 5 reviews for the property
    useEffect(() => {

        async function getData() {
            await getReviewsForPropertyId(property_id.id, 1, 5)
                .then((res) => {
                    setPropertyTopReviews(res);
                    console.log('Retrieved Top 5 Reviews');
                    console.log(res)
                });
        }

        getData();

    }, []);

    // fetch property images
    useEffect(() => {
        getPropertyImages(property_id.id)
            .then((res) => {
                setPropertyImages(res);
                // console.log(propertyImages);
                console.log("property images length : ", propertyImages.length);
            })

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
                                {loading ? <Spinner animation="grow" /> : <PropertyImagesDisplay propertyImages={propertyImages} />}

                            </div>

                            <div className='detailsBody'>

                                <br></br>
                                <br></br>
                                <div style={{ height: '10%' }}>
                                    <div
                                        className='row'
                                        style={{ margin: '0 auto', /* textAlign: 'center', */ backgroundColor: 'rgb(128 128 128 / 20%)', width: '70%', borderRadius: '9px', paddingTop: '2%', paddingLeft: '3%', paddingBottom: '1%' }}>

                                        <h5>{propertyDetails.one_line_description} Hosted by <a href={'/user/' + hostDetails._id}>{hostDetails.first_name} </a></h5>
                                        <p>{propertyDetails.guests} guests &bull; {propertyDetails.bedroom} bedroom &bull; {propertyDetails.bathroom} bath</p>
                                        {renderRating(propertyDetails.avg_rating)}

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

                                <div className='container'>

                                    <div className='row' style={{width: '60%'}}>

                                        <div className='col'>
                                            {renderUpdateButton(propertyDetails.host_id)}
                                        </div>


                                        <div className='col'>
                                            <button
                                                className='btn btn-primary btn-lg'
                                                onClick={() => setShowReviewModal(true)}
                                                id='reviewToggleButton'>
                                                Review
                                            </button>
                                        </div>

                                        {renderReviewPopup(showReviewModal, submitReview, setShowReviewModal, reviewForm, setReviewForm)}

                                        <div className='col'>
                                            <button
                                                className='btn btn-primary btn-lg'
                                                onClick={onClickHandleReserveToggle}
                                                id='reserveToggleButton'>
                                                Reserve
                                            </button>
                                        </div>
                                    </div>
                                    {/* <HandleReserve /> */}
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

function renderUpdateButton(host_id) {
    return (
        host_id === getUserId() ?
            // <div className='col'>
                <button
                    className='btn btn-primary btn-lg'
                    // onClick={() => setShowReviewModal(true)}
                    id='updateToggleButton'>
                    <i className="bi bi-pencil"></i> Update
                </button>
            // </div>
            :
            <></>
    )
}
export function renderRating(rating) {
    return (
        rating !== 0 ? <b><i className="bi bi-star-fill"></i> {rating}</b> : <small><b>No Ratings</b></small>
    )
}


function renderReviewPopup(showReviewModal, submitReview, setShowReviewModal, reviewForm, setReviewForm) {
    console.log('Review popup opened')
    return (
        <Modal show={showReviewModal} id='modal-id'>
            <Modal.Header closeButton>
                <Modal.Title>Write a Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className="form-check-label"> Rating </label>
                <select
                    className="form-select"
                    value={reviewForm.rating}
                    name='rating'
                    required
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <label className="form-check-label"> Review </label>
                <textarea
                    className='form-control'
                    placeholder='Add a review...'
                    name="comments"
                    value={reviewForm.comments}
                    required
                    onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                >
                </textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => setShowReviewModal(false)}
                >
                    Close
                </Button>
                <Button variant="primary" onClick={submitReview}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PropertyDetails
