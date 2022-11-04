import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './Bookmark.css'
import { getUserBookmarks } from '../../services/BookmarkService'
import { Link } from 'react-router-dom'
import SinglePropertyCard from './SinglePropertyCard'
import { getUserId } from '../common/CommonUtils'

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
            <div id='bookmark-container' style={{ width: '100%' }}>
                <h1 className='bookmarkHeading'>Favourites</h1>
                <br></br>
                {
                    bookmarkItems.length === 0 ?
                        <h3 className='emptyFavourites'>
                            Oops...You don't have any Favourites. Start <Link to='/properties'>Browsing</Link>
                        </h3> :
                        bookmarkItems.map(property => {
                            return (
                                <div key={property._id}>
                                    <SinglePropertyCard
                                        property_details={property}
                                        imageSize={imageSize}
                                        cardWidth='70%'
                                        flexDirection='row'
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
