import React, { useEffect, useState } from 'react';
import './PropertyDetails.css';
import Sidebar from '../../sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { deleteProperty, getPropertyById, getPropertyImages } from '../../../services/PropertiesService';
import PropertyImagesDisplay from './PropertyImagesDisplay';
import BodyDetailsAccordion from './BodyDetailsAccordion';
import { addUserReviewForProperty, getReviewsForPropertyId } from '../../../services/ReviewsService';
import { getUserProfileApi } from '../../../services/ProfileService';
import { Button, Modal, Spinner } from 'react-bootstrap';
import moment from 'moment-timezone';
import { getUserPaymentDetails } from '../../../services/PaymentService';
import { createBooking, deleteBooking } from '../../../services/BookingService';
import HandleReserve from './HandleReserve';
import { getUserId } from '../../common/CommonUtils';
import { renderCancelButton, renderSubmitButton } from '../../common/CommonElements';
import AddPropertyModal from '../../profile/AddPropertyModal';


const PropertyDetails = () => {
    let property_id = useParams();

    const [propertyDetails, setPropertyDetails] = useState(null);
    const [propertyTopReviews, setPropertyTopReviews] = useState(null);
    const [hostDetails, setHostDetails] = useState(null);
    const [propertyImages, setPropertyImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const defaultReviewData = { rating: 1, comments: "" }
    const [reviewForm, setReviewForm] = useState(defaultReviewData);
    const [reviewFormErrors, setReviewFormErrors] = useState({});

    const [userPaymentNickNames, setUserPaymentNickNames] = useState(null);
    const [updatePropertyClicked, setUpdatePropertyClicked] = useState(false);

    const handleClose = () => setShow(false);

    const onClickHandleReserveToggle = () => {
        console.log("Show enabled");
        getUserPaymentDetails(getUserId(), true)
            .then((res) => {
                setUserPaymentNickNames(res)
            });

        console.log(userPaymentNickNames);
        setShow(true)
    };

    const submitDelteProperty = () => {
        console.log("Delete property");
        deleteProperty(property_id.id);
    }

    const initialBookindData = Object.freeze({
        start_date: '',
        end_date: '',
        no_of_people: Number.NaN,
        guest_message: ''
    })

    const [showReviewModal, setShowReviewModal] = useState(false);

    const [bookingFormData, setBookingFormData] = useState(initialBookindData);
    const [errorBookingFormData, setErrorBookingFormData] = useState({});

    const tax_rate = 0.05;

    const [bookingFare, setBookingFare] = useState({
        cost: 0,
        taxes: 0,
        // nights: 1,
        nights: Number.NaN,
        total_price: 0,
    })

    const handleBookingFormChange = (e) => {
        setBookingFormData({
            ...bookingFormData,
            [e.target.name]: e.target.value.trim()
        });

        let difference =
            moment.duration(
                moment(bookingFormData.end_date) - moment(bookingFormData.start_date)
            ).days() + 1;

        setBookingFare({
            ...bookingFare,
            cost: (difference * propertyDetails.cost_per_day),
            nights: difference,
            taxes: Math.round(bookingFare.cost * tax_rate * 100) / 100,
            total_price: Math.round((difference * propertyDetails.cost_per_day) * (1 + tax_rate) * 100) / 100
        })
    }

    const submitReview = () => {
        console.log('Review submitted');

        setReviewFormErrors(validateReviewForm(reviewForm))

        if (Object.keys(validateReviewForm(reviewForm)).length === 0) {
            console.log('valid form')
            addUserReviewForProperty(reviewForm, property_id.id)
                .then(setReviewForm(defaultReviewData))
                .then(setShowReviewModal(false))
        } else {
            console.log('invalid review form');
            console.log(reviewForm);
            console.log(reviewFormErrors);
        }
    }

    const validateReviewForm = (values) => {
        const errors = {};
        if (!values.rating) {
            errors.rating = "Rating is required";
        }

        if (!values.comments) {
            errors.comments = "Comments are required";
        }

        return errors
    }

    const validateReserveForm = (values) => {
        const errors = {};
        if (!values.start_date) {
            errors.start_date = "Checkout date is required";
        }

        if (!values.end_date) {
            errors.end_date = "Checkout date is required";
        }

        if (!values.no_of_people) {
            errors.no_of_people = "Total guests is required";
        }

        if (!values.payment_type) {
            errors.payment_type = "Payment Method is required";
        }

        if (!values.payment_details_id) {
            errors.payment_details_id = "Payment Id is required";
        }

        return errors
    }

    const onSubmitBooking = () => {
        console.log('Booking Form Submitted');
        var formData = bookingFormData;
        setErrorBookingFormData(validateReserveForm(formData))
        formData.property_id = property_id.id;
        console.log(formData);
        if (Object.keys(errorBookingFormData).length === 0) {
            createBooking(formData);
        } else {
            console.log('invalid booking form');
            console.log(errorBookingFormData);
        }


        // Call reserve Property API
    }

    useEffect(() => {

    }, [reviewFormErrors])

    // fetching the property details
    useEffect(() => {

        console.log('Fetching property details for id : ' + property_id.id)

        async function getData() {
            await getPropertyById(property_id.id)
                .then(async function (data) {
                    setPropertyDetails(data);
                    let host_id = data.host_id;
                    console.log('Fetching host details : ' + host_id);
                    await getUserProfileApi(host_id)
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
                <div id='property-details-container' style={{ backgroundColor: 'white' }}>
                    <div className="container rounded bg-white mt-5 mb-5" >
                        <h1 className='propertyDetailsHeader'>{propertyDetails.name}</h1>
                        <div className='propertyDetailsBody'>

                            <div className='imagesBody'>
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

                                <div className='container' style={{ width: '70%', paddingTop: '3%' }}>

                                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-around' }}>

                                        {renderUpdateButton(propertyDetails.host_id, setUpdatePropertyClicked, submitDelteProperty)}

                                        {renderDeleteButton(propertyDetails.host_id, submitDelteProperty)}

                                        <button
                                            className='btn btn-primary btn-lg'
                                            onClick={() => setShowReviewModal(true)}
                                            id='reviewToggleButton'>
                                            Review
                                        </button>

                                        {renderReviewPopup(showReviewModal, submitReview, setShowReviewModal, reviewForm, setReviewForm, reviewFormErrors)}

                                        <button
                                            className='btn btn-primary btn-lg'
                                            onClick={onClickHandleReserveToggle}
                                            id='reserveToggleButton'>
                                            Reserve
                                        </button>

                                    </div>
                                    <HandleReserve
                                        show={show}
                                        handleClose={handleClose}
                                        handleBookingFormChange={handleBookingFormChange}
                                        propertyDetails={propertyDetails}
                                        bookingFare={bookingFare}
                                        userPaymentNickNames={userPaymentNickNames}
                                        bookingFormData={bookingFormData}
                                        onSubmitBooking={onSubmitBooking}
                                        errorBookingFormData={errorBookingFormData}
                                    />
                                </div>

                                {updatePropertyClicked ? <AddPropertyModal propertyDetails={propertyDetails} showNewPropertyModal={setUpdatePropertyClicked} cancelNewPropertyModal={e => setUpdatePropertyClicked(false)} /> : <></>}
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div >
            }
        </div >
    )
}

function renderUpdateButton(host_id, setUpdatePropertyClicked, submitDelteProperty) {
    return (
        host_id === getUserId() ?
            <button
                className='btn btn-primary btn-lg'
                onClick={e => setUpdatePropertyClicked(true)}
                id='updateToggleButton'>
                <i className="bi bi-pencil"></i> Update
            </button>
            :
            <></>
    )
}


function renderDeleteButton(host_id, submitDelteProperty) {
    return (
        host_id === getUserId() ?
            <button
                className='btn btn-primary btn-lg'
                onClick={e => submitDelteProperty()}
                id='updateToggleButton'>
                <i class="bi bi-trash"></i> Delete
            </button>
            :
            <></>
    )
}
export function renderRating(rating, isBookingType) {
    return (
        rating !== 0 ? <b><i className="bi bi-star-fill"></i> {rating}</b> : <small><b>No Ratings</b></small>
    )
}

function renderReviewPopup(showReviewModal, submitReview, setShowReviewModal, reviewForm, setReviewForm, reviewFormErrors) {
    return (
        <Modal show={showReviewModal} id='modal-id'>
            <Modal.Header closeButton>
                <Modal.Title>Write a Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='container' style={{ width: '95%' }}>
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
                    <br></br>
                    <label className="form-check-label"> Comments </label>
                    <textarea
                        className='form-control'
                        placeholder='Add your comments...'
                        name="comments"
                        value={reviewForm.comments}
                        required
                        onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                    >
                    </textarea>
                    <small className="error">{reviewFormErrors.comments}</small>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <Button
                        variant="secondary"
                        onClick={() => setShowReviewModal(false)}>
                        {renderCancelButton()}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={e => submitReview()} style={{ marginLeft: '8%' }}>
                        {renderSubmitButton()}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default PropertyDetails
