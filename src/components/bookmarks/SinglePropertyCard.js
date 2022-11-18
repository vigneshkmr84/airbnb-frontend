import React from 'react'
import { deleteBooking } from '../../services/BookingService'
import { deleteBookmark } from '../../services/BookmarkService'
import { dateFormat, getUserId } from '../common/CommonUtils'
import { renderCancelButton } from '../common/IconButtons'
import { renderRating } from '../properties/propertydetails/PropertyDetails'
import './Bookmark.css'

// Display bookmark details - a full card
const SinglePropertyCard = ({ property_details, imageSize, cardWidth, flexDirection, bookmarkItems, setBookmarkItems, isBookingType, booking_details }) => {

    const onClickDeleteBookmark = async (e, _id) => {
        console.log('Deleting bookmark : ', _id);
        console.log(bookmarkItems);
        let status = await deleteBookmark(getUserId(), _id);
        let items = bookmarkItems;
        if (status === 200) {
            console.log('filtering elements');
            items?.filter(el => el._id !== _id)
        }
        console.log(items);
        setBookmarkItems(items);
    }

    const onClickDeleteBooking = async (e, _id) => {
        console.log('Deleting bookmark : ', _id);
        console.log(bookmarkItems);
        deleteBooking(getUserId(), _id);
    }

    return (

        <div className='row' style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <div className='card' style={{ width: cardWidth, flexDirection: flexDirection }} >
                <div className='card-image'>
                    <img
                        src={"data:image/png;base64," + property_details.img}
                        alt="property"
                        id="property-image"
                        style={{ width: imageSize, height: imageSize }}
                    />
                </div>
                <div className="card-body">

                    <div className='row'>
                        <div className='col-md-8'>
                            <div className="card-title">
                                <a href={'./properties/' + property_details._id}>{property_details.name} </a>
                            </div>
                        </div>
                        <div className='col-md-4' style={{ textAlign: isBookingType === true ? 'right' : 'none' }}>
                            {isBookingType ? <></> : <small className="card-cost"><b>{property_details.cost_per_day}$/ day</b></small>}
                            {renderRating(property_details.avg_rating, isBookingType)}
                        </div>
                    </div>

                    {
                        !isBookingType ? renderBookmarks(property_details, onClickDeleteBookmark) : renderBookings(booking_details, onClickDeleteBooking)
                    }


                </div>
            </div>
        </div>
    )
}

export const renderBookings = (bookingData, onClickDeleteBooking) => {

    return (
        <div>
            <div className='row'>
                <div className='col-md-12'>
                    <small>
                        <b>Start Date : </b> {dateFormat(bookingData.start_date)} &bull;&nbsp;
                        <b>End Date : </b> {dateFormat(bookingData.end_date)}
                    </small>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <small className="room-details">
                        <b>Guests:</b> {bookingData.no_of_people}
                    </small>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <small className="cost-details">
                        <b>Total Cost:</b> {bookingData.total_cost}$
                    </small>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <small className="cost-details">
                        <b>Payment used:</b> {bookingData.payment_details_id}
                    </small>
                </div>
            </div>
            {
                bookingData.canceled ?
                    <div className='row'>
                        <div className='col-md-12'>
                            <small style={{ color: 'red' }}><b>Canceled Booking</b></small>
                        </div>
                    </div>
                    : new Date().getTime() > new Date(bookingData.end_date).getTime() ?
                        <div className='row'>
                            <div className='col-md-12'>
                                <small style={{ color: 'green' }}><b>Trip Completed</b></small>
                            </div>
                        </div>
                        : <></>
            }
            {

            }
            {/* Do not show Cancel button if it's already canceled */}
            {
                isCancelable(bookingData)
                    ?
                    <></>
                    : <div className='row'>
                        <div className='col-md-12'>
                            <button
                                className='btn btn-danger'
                                style={{ float: 'right' }}
                                onClick={(e) => onClickDeleteBooking(e, bookingData._id)}
                            >
                                {renderCancelButton()}
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}

const isCancelable = (bookingData) => {

    // trip already completed / already canceled
    return (
        bookingData.canceled || new Date().getTime() > new Date(bookingData.end_date).getTime()
    )
}

const renderBookmarks = (property_details, onClickDeleteBookmark) => {

    return (

        <div>
            <div className='row'>
                <p className="card-text">{property_details.description}</p>
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <small className="room-details">
                        <b>Guests:</b> {property_details.guests} &bull;&nbsp;
                        <b>Bedroom:</b> {property_details.bedroom} &bull;&nbsp;
                        <b>Bath:</b> {property_details.bathroom}
                    </small>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <small className="room-details">
                        <b>Checkin:</b> {property_details.checkin_time} &bull;&nbsp;
                        <b>Checkout:</b> {property_details.checkout_time}
                    </small>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-10'>
                    <small>Host : Adam</small>
                </div>
                <div className='col-md-2'>
                    <button
                        className='btn'
                        style={{ color: '#e62929', float: 'right' }}
                        onClick={(e) => onClickDeleteBookmark(e, property_details._id)}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
            </div>
        </div>

    );
}

export default SinglePropertyCard