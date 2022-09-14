import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import './PropertyDetails.css'
import { FcCancel } from 'react-icons/fc';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { makeFirstLetterCaps } from '../../common/CommonUtils';
import { MdOutlineRateReview } from 'react-icons/md';
import { getReviewsForPropertyId } from '../../../services/ReviewsService';
import { Spinner } from 'react-bootstrap';


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
    console.log(hostDetails.host_details);

    return (
        <Accordion defaultActiveKey='description' >
            <Accordion.Item eventKey='description'>
                <Accordion.Header><h4>Description</h4></Accordion.Header>
                <Accordion.Body>

                    {property_details.description}

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='house_rules'>
                <Accordion.Header><h4>House Rules <BsFillHouseDoorFill /></h4></Accordion.Header>
                <Accordion.Body>

                    {generateHouseRules(property_details.house_rules)}

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='cancellation_policy'>
                <Accordion.Header><h4>Cancellation Policy <FcCancel /></h4></Accordion.Header>
                <Accordion.Body>

                    {property_details.cancellation_policy}

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
                                <p key={index}>{review.comments}</p>
                            )
                        })

                    }

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='host_details'>
                <Accordion.Header><h4>Know your Host ?</h4></Accordion.Header>
                <Accordion.Body>

                    <h5>Hosted by {hostDetails.first_name} </h5>
                    {/* <p>{ hostDetails.host_details.is_superhost ? hostDetails.first_name + " is a Superhost" : null }</p> */}
                    {/* {hostDetails.host_details.description} */}
                    <p> {hostDetails.first_name} joined on {hostDetails.created_at}</p>
                    {/* <p> Languages: { hostDetails.host_details.languages} </p> */}
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
            return (<li key={index}>{makeFirstLetterCaps(item)}</li>)
        })
    )
}

function generateHouseRules(house_rules) {

    return (
        house_rules?.map((rule, index) => {
            return (<li key={index}>{makeFirstLetterCaps(rule)}</li>)
        })
    )

}
export default BodyDetailsAccordion