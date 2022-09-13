import React from 'react'
import { Accordion } from 'react-bootstrap'
import './PropertyDetails.css'
import { FcCancel } from 'react-icons/fc';
import { BsFillHouseDoorFill } from 'react-icons/bs';


const BodyDetailsAccordion = ({ property_details }) => {

    console.log(property_details)

    return (
        <Accordion defaultActiveKey='description' >
            <Accordion.Item eventKey='description'>
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                    {property_details.description}

                    {/* {description}  */}
                    {/* {property_details.description} */}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='house_rules'>
                <Accordion.Header>House Rules <BsFillHouseDoorFill /></Accordion.Header>
                <Accordion.Body>
                    {/* {property_details.house_rules} */}
                    {/* house rules */}
                    {
                        property_details.house_rules.map((rule, index) => {
                            return (<li key={index}>{rule}</li>)
                        })
                    }
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='cancellation_policy'>
                <Accordion.Header>Cancellation Policy <FcCancel /></Accordion.Header>
                <Accordion.Body>
                    {property_details.cancellation_policy}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default BodyDetailsAccordion