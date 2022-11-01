import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import './PropertyDetails.css'
import { FcCancel } from 'react-icons/fc';
import { BsFillHouseDoorFill, BsShieldFillCheck } from 'react-icons/bs';
import { makeFirstLetterCaps, parseLines } from '../../common/CommonUtils';
import { MdOutlineRateReview } from 'react-icons/md';
import { getReviewsForPropertyId } from '../../../services/ReviewsService';
import { Spinner } from 'react-bootstrap';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import NearbyPlacesMap from './NearbyPlacesMap';


// details = {{property_details: propertyDetails, reviews: propertyTopReviews, hostDetails: hostDetails}}
const BodyDetailsAccordion = ({ details }) => {



    const property_details = details.property_details;
    const reviews = details.reviews;
    const hostDetails = details.hostDetails;

    /* const [propertyTopReviews, setPropertyTopReviews] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        console.log("Property id : "+property_details._id);
        // console.log(property_details);
        setLoading(true)
        getReviewsForPropertyId(property_details._id, 1, 5)
            .then((res) => {
                setPropertyTopReviews(res);
            }).finally(() => {
                setLoading(false);
            });

        console.log(propertyTopReviews);
        console.log('Retrieved Top 5 Reviews');

    }, []); */



    // console.log(hostDetails);
    // console.log(hostDetails.host_details);

    return (
        <Accordion defaultActiveKey='description' >
            <Accordion.Item eventKey='description'>
                <Accordion.Header><h4>Description</h4></Accordion.Header>
                <Accordion.Body>

                    {parseLines(property_details.description)}

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='house_rules'>
                <Accordion.Header><h4>House Rules <BsFillHouseDoorFill /></h4></Accordion.Header>
                <Accordion.Body>
                    <ul>
                        <li>
                            <small>Checkin Time: {property_details.checkin_time}</small>
                        </li>
                        <li>
                            <small>Checkout Time: {property_details.checkout_time}</small>
                        </li>
                    </ul>
                    {generateHouseRules(property_details.house_rules)}

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='pricing'>
                <Accordion.Header><h4>Pricing <AiOutlineDollarCircle /></h4></Accordion.Header>
                <Accordion.Body>
                    {showPricing(property_details)}
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

                    {generateAmenities(property_details.amenities)}

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='reviews'>
                <Accordion.Header><h4>What others have to say about the place ? <MdOutlineRateReview /></h4></Accordion.Header>
                <Accordion.Body>

                    {/* {generateAmenities(property_details.amenities)} */}
                    {
                        reviews?.map((review, index) => {
                            return (
                                <p key={index}>{parseLines(review.comments)}</p>
                            )
                        })

                    }

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='host_details'>
                <Accordion.Header><h4>Know your Host...</h4></Accordion.Header>
                <Accordion.Body>

                    <h5>The Property is hosted by
                        <a href={'/user/' + hostDetails._id}> {hostDetails.first_name} </a>
                    </h5>
                    <p>{hostDetails.host_details.is_superhost ? <small> Verified Superhost</small> : null} {hostDetails.host_details.is_superhost ? <BsShieldFillCheck /> : null}</p>
                    <p> <b>About me :</b> {hostDetails.host_details.description}</p>
                    <p> <b>Languages: </b> {hostDetails.host_details.languages.toString()}</p>
                    <p> <b>Host from: </b> {hostDetails.created_at}</p>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='nearby_places'>
                <Accordion.Header><h4>Nearby Attractions</h4></Accordion.Header>
                <Accordion.Body>


                    <NearbyPlacesMap />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

function generateAmenities(amenitiesArray) {
    return (
        <div>
            {
                amenitiesArray?.map((amenitiesObject, index1) => {
                    return (
                        <div key={index1}>
                            <h4 key={index1}>{makeFirstLetterCaps(amenitiesObject.category)}</h4>

                            {generateSubAmenities(amenitiesObject.amenities)}

                            <br></br>
                        </div>
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

function generateHouseRules(house_rules) {

    return (
        house_rules?.map((rule, index) => {
            return (<li key={index}>
                <small>{makeFirstLetterCaps(rule)}</small>
            </li>)
        })
    )

}
function showPricing(payment_details) {
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
            {/* <li> */}
            <br></br>
            <small>*Additional Taxes might apply</small>
            {/* </li> */}
        </ul>
    )
}
export default BodyDetailsAccordion