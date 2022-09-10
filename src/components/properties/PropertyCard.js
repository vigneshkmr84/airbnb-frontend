import React from 'react'
//import logo from '../profile/user-profile.jpg'
// import logo from '../profile/card-image.webp'
import './Properties.css'
import Card from 'react-bootstrap/Card';
import { AiOutlineHeart } from 'react-icons/ai';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PropertyCard = ({ property_details, imageSize, imageHeight, imageWidth, cardWidth, flexDirection }) => {

    return (


        <Card 
            style={{ borderRadius: '6px', width: '100%' }} 
            className='flip-card'
            // key={property_details._id}
            >


            <div className='flip-card-inner'>
                {/* <Card.Img className="img-fluid" variant="top" src={logo} style={{ width: imageSize, height: imageSize, display: 'block', margin: '0 auto' }} /> */}
                <Card.Img className="img-fluid"
                    variant="top"
                    src={"data:image/png;base64," + property_details.img}
                    style={{ width: imageWidth, height: imageHeight, display: 'block', margin: '0 auto', marginTop: '20px' }} />
                <Card.Body className='flip-card-front'>
                    <Card.Title style={{ fontSize: '15px' }}>
                        <b><a href={'./properties/' + property_details._id}>{property_details.name} </a></b>
                    </Card.Title>
                    <Card.Text className='card-text'>
                        {/* {property_details.description} */}
                        {property_details.location}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='flip-card-front'>
                    <b>{property_details.cost_per_day}$ </b>night &nbsp;&nbsp;&nbsp; {property_details.bedroom} beds,{property_details.bathroom} bath
                    {/* <button className='btn btn-md'><AiOutlineHeart style={{ color: 'red' }} /></button> */}
                </Card.Footer>

                {/* <Card.Body className='flip-card-back'>
                    <Card.Text className='card-text'>
                        {property_details.bedroom} beds,{property_details.bathroom} bath
                    </Card.Text>
                </Card.Body> */}
            </div>

        </Card>
    )

}

export default PropertyCard
