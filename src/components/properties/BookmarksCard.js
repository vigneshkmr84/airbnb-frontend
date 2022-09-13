import React from 'react'
//import logo from '../profile/user-profile.jpg'
// import logo from '../profile/card-image.webp'
import './Properties.css'
import Card from 'react-bootstrap/Card';
import { AiOutlineHeart } from 'react-icons/ai';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const BookmarksCard = ({ property_details, imageHeight, imageWidth, cardWidth, flexDirection }) => {

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
                    // style={{ width: imageWidth, height: imageHeight, display: 'block', margin: '0 auto', marginTop: '20px' }} />
                    style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px', display: 'block', height: imageHeight }}
                />
                <Card.Body className='flip-card-front'>
                    <Card.Title style={{ fontSize: '15px' }}>
                        {/* <b><a href={'./properties/' + property_details._id}>{property_details.name} </a></b> */}
                        <b><a href={property_details._id}>{property_details.name} </a></b>
                    </Card.Title>
                    <Card.Text className='card-text'>
                        {/* {property_details.description} */}
                        {property_details.location}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='flip-card-front'>
                    <b>{property_details.cost_per_day}$ </b>night
                    {/* {property_details.bedroom} beds,{property_details.bathroom} bath */}
                    {/* <button className='btn btn-outline-danger'>
                        <span className="input-group-text" style={{backgroundColor: 'rgb(207, 61, 61)'}}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                                className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </span>
                    </button> */}
                    <button type="button" className="btn btn-outline-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                        </svg>
                        <span className="visually-hidden">Button</span>
                    </button>
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

export default BookmarksCard
