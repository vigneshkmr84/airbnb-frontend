import React from 'react'
import './PropertyDetails.css'
/* import p1 from './p1.webp'
import p2 from './p2.webp'
import p3 from './p3.webp'
import p4 from './p4.webp' */
import Carousel from 'react-bootstrap/Carousel';


const PropertyImagesDisplay = (property_details, property_images) => {
    return (

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Carousel
                controls={true}
                keyboard={true}
                interval={20000}
                indicators={true}
                // containerCustomStyle={{ flexGlow: 0 }}
            >
                <Carousel.Item>
                    <div style={{ height: '600px', width: '1000px' }}>
                        <img
                            // src={p1}
                            src='/p1.webp'
                            alt="First slide"
                            style={{ height: '100%', width: 'auto' }}
                        />
                    </div>
                    <Carousel.Caption>
                        <h3>First image</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <div style={{ height: '600px', width: '1000px' }}>
                        <img
                            // src={p2}
                            src='/p2.webp'
                            alt="Second slide"
                            style={{ height: '100%', width: 'auto' }}
                        />
                    </div>
                    <Carousel.Caption>
                        <h3>Second image</h3>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <div style={{ height: '600px', width: '1000px' }}>
                        <img
                            // src={p3}
                            src='/p3.webp'
                            alt="First slide"
                            style={{ height: '100%', width: 'auto' }}
                        />
                    </div>
                    <Carousel.Caption>
                        <h3>Third image</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <div style={{ height: '600px', width: '1000px' }}>
                        <img
                            // src={p4}
                            src='/p4.webp'
                            alt="First slide"
                            style={{ height: '100%', width: 'auto' }}
                        />
                    </div>
                    <Carousel.Caption>
                        <h3>Fourth image</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default PropertyImagesDisplay