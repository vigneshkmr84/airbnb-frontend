import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getUserBookings } from '../../services/BookingService';
import SinglePropertyCard from '../bookmarks/SinglePropertyCard';
import Sidebar from '../sidebar/Sidebar'
import './Bookings.css'

const Bookings = () => {

    const [bookingData, setBookingData] = useState([]);
    const imageSize = '250px';

    useEffect(() => {
        console.log('Fetching bookings data');
        getUserBookings()
            .then(res => {
                setBookingData(res);
                console.log(res);
            })
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />

            <div id='bookings-container' style={{ width: '100%' }}>
                <div className="container rounded bg-white mt-5 mb-5" >
                    <div className='bookingsHeader'>
                        <h1>Bookings</h1>
                    </div>

                    <div className='bookingsBody'>
                        {
                            bookingData.length === 0
                                ? renderEmptyBookingsData()
                                : bookingData?.map(booking => {
                                    return (
                                        <div key={booking._id}>
                                            <SinglePropertyCard
                                                property_details={booking.property_details}
                                                booking_details={booking}
                                                imageSize={imageSize}
                                                bookmarkItems={bookingData}
                                                setBookmarkItems={setBookingData}
                                                cardWidth='80%'
                                                flexDirection='row'
                                                isBookingType={true} />
                                            <br></br>
                                        </div>)
                                }
                                )
                        }
                    </div>

                    <div className='bookingsFooter'>

                    </div>
                </div>
            </div>
        </div>

    )
}

function renderEmptyBookingsData() {
    return (
        <h3 className='emptyData'>
            Start <Link to='/home'>browsing</Link> and book your stays.
        </h3>
    )
}
export default Bookings
