import React from 'react'
import { Accordion } from 'react-bootstrap'
import './PropertyDetails.css'
import { FcCancel } from 'react-icons/fc';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { makeFirstLetterCaps } from '../../common/CommonUtils';


const BodyDetailsAccordion = ({ property_details }) => {

    console.log(property_details)

    return (
        <Accordion defaultActiveKey='description' >
            <Accordion.Item eventKey='description'>
                <Accordion.Header><h4>Description</h4></Accordion.Header>
                <Accordion.Body>
                    {property_details.description}

                    {/* {description}  */}
                    {/* {property_details.description} */}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='house_rules'>
                <Accordion.Header><h4>House Rules <BsFillHouseDoorFill /></h4></Accordion.Header>
                <Accordion.Body>
                    {/* <HouseRules property_details={property_details.house_rules} /> */}
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
                    {
                        generateAmenities(property_details.amenities)
                    }

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

function generateAmenities(amenitiesArray) {
    return (
        <div>
            {
                amenitiesArray.map((amenitiesObject, index1) => {
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
        categoryArray.map((item, index) => {
            return (<li key={index}>{makeFirstLetterCaps(item)}</li>)
        })
    )
}

function generateHouseRules(house_rules) {

    return (
        house_rules.map((rule, index) => {
            return (<li key={index}>{makeFirstLetterCaps(rule)}</li>)
        })
    )

}
export default BodyDetailsAccordion