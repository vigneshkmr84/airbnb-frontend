import React from 'react'
import { deleteBookmark } from '../../services/BookmarkService'
import { getUserId } from '../common/CommonUtils'
import { renderRating } from '../properties/propertydetails/PropertyDetails'
import './Bookmark.css'

// Display bookmark details - a full card
const SinglePropertyCard = ({ property_details, imageSize, cardWidth, flexDirection, bookmarkItems, setBookmarkItems }) => {

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

    return (

        <div className='row' style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <div className='card' style={{ width: cardWidth, flexDirection: flexDirection }} >
                <div className='card-image'>
                    <img
                        src={"data:image/png;base64," + property_details.img}
                        alt="Red dot"
                        id="profile-picture"
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
                        <div className='col-md-4'>
                            <small className="card-cost"><b>{property_details.cost_per_day}$/ day</b></small>
                            {renderRating(property_details.avg_rating)}
                        </div>
                    </div>


                    <div className='row'>
                        <p className="card-text">{property_details.description}</p>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <small className="room-details"> <b>Guests:</b> {property_details.guests} <b>Bedroom:</b> {property_details.bedroom} <b>Bath:</b> {property_details.bathroom}</small>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <small className="room-details"> <b>Checkin:</b> {property_details.checkin_time} <b>Checkout:</b> {property_details.checkout_time}</small>
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
            </div>
        </div>
    )
}

export default SinglePropertyCard