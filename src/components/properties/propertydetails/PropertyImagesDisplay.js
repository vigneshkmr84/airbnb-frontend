import React from 'react'
import './PropertyDetails.css'
import Carousel from 'react-bootstrap/Carousel';


const PropertyImagesDisplay = ({ propertyImages }) => {


    const renderImages = (singleImage, index) => {
        return (
            <Carousel.Item key={index}>
                <div style={{ height: '600px', width: '1000px' }}>
                    <img
                        src={"data:image/png;base64," + singleImage.image}
                        alt={singleImage.title}
                        style={{ height: '100%', width: 'auto' }}
                    />
                </div>
                <Carousel.Caption>
                    <h6>{singleImage.title}</h6>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    return (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Carousel
                controls={true}
                keyboard={true}
                interval={20000}
                indicators={true}
            >
                {
                    propertyImages?.map((singleImage, index) => {
                        return renderImages(singleImage, index)
                    })

                }
            </Carousel>
        </div>
    )
}

export default PropertyImagesDisplay