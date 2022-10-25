import React from 'react'
import './Properties.css'
import Card from 'react-bootstrap/Card';
import { AiOutlineHeart } from 'react-icons/ai';

const BookmarksCard = ({ property_details, imageHeight, imageWidth, cardWidth, flexDirection }) => {

    return (


        <Card
            style={{ borderRadius: '6px', width: '100%' }}
            className='flip-card'
        >

            <div className='flip-card-inner'>
                <Card.Img className="img-fluid"
                    variant="top"
                    src={"data:image/png;base64," + property_details.img}
                    style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px', display: 'block', height: imageHeight }}
                />
                <Card.Body className='flip-card-front'>
                    <Card.Title style={{ fontSize: '15px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordWrap: 'break-word' }}>
                        <b><a className='text' href={'properties/' + property_details._id} >{property_details.name} </a></b>
                    </Card.Title>
                    <Card.Text className='card-text' style={{ fontSize: '10px', textAlign: 'left' }}>
                        {property_details.location.replace(/ +(?= )/g, ' ')}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='flip-card-front'>

                    <div style={{ fontSize: '15px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', wordWrap: 'break-word' }}>
                        <b style={{ textAlign: 'left' }}>{property_details.cost_per_day}$</b>

                        <a onClick={() => alert('clicked')} style={{ float: 'right' }}>
                            <AiOutlineHeart size={14} />
                        </a>
                    </div>
                </Card.Footer>

            </div >

        </Card >
    )

}

export default BookmarksCard
