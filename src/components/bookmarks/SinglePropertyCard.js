import React from 'react'
//import logo from '../profile/user-profile.jpg'
import logo from '../profile/card-image.webp'
import './Bookmark.css'
import { AiFillDelete } from 'react-icons/ai';

const SinglePropertyCard = ({ property_details, imageSize }) => {
    return (

        <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <div className="card" style={{ width: '70%' }} >
                <div className='card-image'>
                    <img src={logo} className="card-img-top" alt="..." style={{ width: imageSize, height: imageSize }} />
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-8'>
                            <h5 className="card-title">
                                <a href={'./property/' + property_details._id} /* className="btn btn-danger btn-sm" */>Delete{property_details.name} </a>
                            </h5>
                        </div>
                        <div className='col-md-4' style={{}}>
                            <h6 className="card-cost">{property_details.cost_per_day}$/ day</h6>
                        </div>
                    </div>

                    <div className='row'>
                        <p className="card-text">{property_details.description}</p>
                    </div>

                    <div className='row'>
                        <div className='col-md-4' style={{}}>
                            <p className="room-details"> <b>Total Guests:</b> {property_details.guests}</p>
                        </div>
                        <div className='col-md-4' style={{}}>
                            <p className="room-details"> <b>Checkin:</b> {property_details.checkin_time}</p>
                        </div>
                        <div className='col-md-4' style={{}}>
                            <p className="room-details"> <b>Checkout:</b> {property_details.checkout_time}</p>
                        </div>
                    </div>
                    <div className='row'>
                        {/* Separate Button to view the property details */}

                        <div className='col-md-4' style={{}}>
                            <label htmlFor="rating-inline"><b>Avg rating:</b></label>
                            <b-form-rating id="rating-inline" inline value="5"></b-form-rating>
                        </div>

                        {/* <div className='col-md-6' style={{}}>
                            <a href={'./property/' + property_details._id} className="btn btn-primary btn-sm">View Property</a>
                        </div> */}
                        <div className='col-md-6' style={{}}>
                            <p className="room-details"> <b>Bedroom:</b> {property_details.bedroom} <b>Bathroom:</b> {property_details.bathroom}</p>
                        </div>
                        <div className='col-md-2' style={{ color: '#e62929' }} id='delete-button' onClick={() => alert(property_details._id + " Deleted")}>
                            {/* <a href={'./property/' + property_details._id} className="btn btn-danger btn-sm">Delete</a> */}
                            <AiFillDelete />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePropertyCard