import React from 'react'
import logo from '../profile/card-image.webp'
import './Bookmark.css'

const  SinglePropertyCard = ({ property_details, imageSize, cardWidth, flexDirection, counter }) => {
    return (

        <div className='row' style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <div className='card' style={{ width: cardWidth, flexDirection: flexDirection }} >
                <div className='card-image'>
                    <img src={logo} className="card-img-top" alt="..." style={{ width: imageSize, height: imageSize }} />
                </div>
                <div className="card-body">
                    {/* Property Name and Cost / Day */}
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className="card-title">
                                <a href={'./property/' + property_details._id}>{property_details.name} </a>
                            </div>
                        </div>
                        <div className='col-md-4' style={{}}>
                            <h6 className="card-cost">{property_details.cost_per_day}$/ day</h6>
                        </div>
                    </div>

                    {/* Description of the property */}
                    <div className='row'>
                        <p className="card-text">{property_details.description}</p>
                    </div>

                    {/* Guests, Checkin & Checkout time  */}
                    {/* <div className='row'>
                        <div className='col-md-4' style={{}}>
                            <p className="room-details"> <b>Guests:</b> {property_details.guests}</p>
                        </div>
                        <div className='col-md-4' style={{}}>
                            <p className="room-details"> <b>Checkin:</b> {property_details.checkin_time}</p>
                        </div>
                        <div className='col-md-4' style={{}}>
                            <p className="room-details"> <b>Checkout:</b> {property_details.checkout_time}</p>
                        </div>
                    </div> */}
                    {/* Ratings, Bedroom & Bathroom row */}
                    {/* <div className='row'>
                        <div className='col-md-4' style={{}}>
                            <label htmlFor="rating-inline"><b>Avg rating:</b> {property_details.avg_rating}</label>
                        </div>
                        <div className='col-md-6' style={{}}>
                            <p className="room-details"> <b>Bedroom:</b> {property_details.bedroom} <b>Bathroom:</b> {property_details.bathroom}</p>
                        </div>
                        <div className='col-md-2' id='delete-button' onClick={() => alert(property_details._id + " Deleted")}>
                            <button className='btn' style={{ color: '#e62929' }} ><AiFillDelete /></button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SinglePropertyCard