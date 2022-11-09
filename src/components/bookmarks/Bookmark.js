import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { getUserBookmarks } from '../../services/BookmarkService'
import { Link } from 'react-router-dom'
import SinglePropertyCard from './SinglePropertyCard'
import { getUserId } from '../common/CommonUtils'
import './Bookmark.css'

const Bookmark = () => {

    // setting default bookmarked items as empty array[]
    const [bookmarkItems, setBookmarkItems] = useState([]);

    useEffect(() => {
        let user_id = getUserId();
        console.log('Fetching Bookmarks for user : ', user_id);
        getUserBookmarks(user_id)
            .then((res) => {
                setBookmarkItems(res);
            });
    }, []);

    // const imageSize = '150px';
    const imageSize = '250px';

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            <div id='bookmark-container'>
                <h1 className='bookmarkHeading'>Favourites</h1>
                <br></br>
                {
                    bookmarkItems.length === 0 ?
                        <h3 className='emptyFavourites'>
                            Oops...You don't have any Favourites. Start <Link to='/home'>Browsing</Link>
                        </h3> :
                        bookmarkItems?.map(property => {
                            return (
                                <div key={property._id}>
                                    <SinglePropertyCard
                                        property_details={property}
                                        imageSize={imageSize}
                                        bookmarkItems={bookmarkItems}
                                        setBookmarkItems={setBookmarkItems}
                                        cardWidth='70%'
                                        flexDirection='row'
                                        isBookingType={false}
                                    // cardWidth='30%'
                                    // flexDirection='column'
                                    />
                                    <br></br>
                                </div>)
                        }

                        )
                }
            </div>
        </div>
    )
}

export default Bookmark
