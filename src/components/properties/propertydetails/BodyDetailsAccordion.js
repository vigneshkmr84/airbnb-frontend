import React from 'react'
import { Accordion } from 'react-bootstrap'
import './PropertyDetails.css'
import { FcCancel } from 'react-icons/fc';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { makeFirstLetterCaps, parseLines } from '../../common/CommonUtils';
import { MdOutlineRateReview } from 'react-icons/md';

import { AiOutlineDollarCircle } from 'react-icons/ai';
import NearbyPlacesMap from './NearbyPlacesMap';


// details = {{property_details: propertyDetails, reviews: propertyTopReviews, hostDetails: hostDetails}}
const BodyDetailsAccordion = ({ details }) => {

    const property_details = details.property_details;
    const reviews = details.reviews;
    const hostDetails = details.hostDetails;

    return (
        <Accordion defaultActiveKey='description' key={details.property_id}>
            <Accordion.Item eventKey='description'>
                <Accordion.Header><h4>Description</h4></Accordion.Header>
                <Accordion.Body>

                    {parseLines(property_details.description)}

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='house_rules'>
                <Accordion.Header><h4>House Rules <BsFillHouseDoorFill /></h4></Accordion.Header>
                <Accordion.Body>
                    <div className='row'>
                        <h6 className='input-text'>Timings</h6>
                        <ul>
                            <li>
                                <small>Checkin Time: {property_details.checkin_time}</small>
                            </li>
                            <li>
                                <small>Checkout Time: {property_details.checkout_time}</small>
                            </li>
                        </ul>
                    </div>

                    {renderHouseRules(property_details.house_rules)}



                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='pricing'>
                <Accordion.Header><h4>Pricing <AiOutlineDollarCircle /></h4></Accordion.Header>
                <Accordion.Body>
                    {renderPricing(property_details)}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='cancellation_policy'>
                <Accordion.Header><h4>Cancellation Policy <FcCancel /></h4></Accordion.Header>
                <Accordion.Body>

                    <p>{parseLines(property_details.cancellation_policy)}</p>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='amenities'>
                <Accordion.Header><h4>What this place offers ?</h4></Accordion.Header>
                <Accordion.Body>

                    {renderAmenities(property_details.amenities)}

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='reviews'>
                <Accordion.Header><h4>What others have to say about the place ? <MdOutlineRateReview /></h4></Accordion.Header>
                <Accordion.Body>

                    {
                        renderReviews(reviews)

                    }

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='host_details'>
                <Accordion.Header><h4>Know your Host...</h4></Accordion.Header>
                <Accordion.Body>

                    <h5>The Property is hosted by
                        <a href={'/user/' + hostDetails._id}> {hostDetails.first_name} </a>
                    </h5>
                    {/* <p>{hostDetails.host_details.is_superhost ? <small> Verified Superhost</small> : null} {hostDetails.host_details.is_superhost ? <BsShieldFillCheck /> : null}</p> */}
                    <p> <b>About me :</b> {hostDetails.description}</p>
                    <p> <b>Languages: </b> {hostDetails.languages?.toString()}</p>
                    <p> <b>Host from: </b> {hostDetails.created_at}</p>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='nearby_places'>
                <Accordion.Header><h4>Nearby Attractions</h4></Accordion.Header>
                <Accordion.Body>

                    <NearbyPlacesMap latitude={property_details.latitude} longitude={property_details.longitude} />

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

function renderAmenities(amenitiesArray) {
    return (
        <div>
            {
                amenitiesArray?.map((amenitiesObject, index1) => {
                    return (
                        amenitiesObject.amenities.length !== 0 ?
                            <div key={index1}>
                                <h4 key={index1}>{makeFirstLetterCaps(amenitiesObject.category)}</h4>

                                {generateSubAmenities(amenitiesObject.amenities)}

                                <br></br>
                            </div>
                            : <></>
                    )

                }
                )
            }
        </div>
    )
}


function generateSubAmenities(categoryArray) {
    return (
        categoryArray?.map((item, index) => {
            return (
                <li key={index}>
                    <small>{makeFirstLetterCaps(item)}</small>
                </li>)
        })
    )
}

function renderHouseRules(house_rules) {

    return (
        <div className='row'>
            <h6>Rules</h6>
            <ul>
                {house_rules?.map((rule, index) => {
                    return (
                        <li key={index}>
                            <small>{makeFirstLetterCaps(rule)}</small>
                        </li>)
                })}
            </ul>
        </div>
    )

}
function renderPricing(payment_details) {
    return (
        <ul>
            <li>
                <small>Cost per Day: {payment_details.cost_per_day}$</small>
            </li>
            <li>
                <small>Cleaning Cost: {payment_details.cleaning_cost}$</small>
            </li>
            <li>
                <small>Service Cost: {payment_details.service_cost}$</small>
            </li>
            <br></br>
            <small>*Additional Taxes might apply</small>
        </ul>
    )
}


function renderReviews(reviews) {
    return (
        reviews.length !== 0 ?
            reviews?.map((review, index) => {
                return (
                    <p key={index}><small><b>{review.user_name}</b>: {parseLines(review.comments)}</small></p>
                )
            })
            : "Not yet Reviewed"
    )
}

export default BodyDetailsAccordion
