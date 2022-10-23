import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './Properties.css';
import { getAllProperties } from '../../services/PropertiesService';
// import SinglePropertyCard from '../bookmarks/SinglePropertyCard';
import BookmarksCard from './BookmarksCard';
import Footer from '../footer/Footer';


const Properties = () => {

    const [propertiesList, setAllPropertiesList] = useState([]);

    useEffect(() => {
        getAllProperties()
            .then((res) => {
                setAllPropertiesList(res);
                // console.log(res);
            })
    }, []);

    /* const imageWidth = '250px';
    const imageHeight = '200px'; */
    const imageWidth = '170px';
    const imageHeight = '120px';

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Sidebar />
                <div id='properties-container' style={{ width: '100%' }}>
                    {/* <div className="container rounded bg-white mt-5 mb-5" style={{ maxHeight: '2600px' }}> */}
                    <div className="proeprtiesBody" style={{ maxHeight: '2600px' }}>
                        <h1 className='propertiesHeader'>Find your Stays</h1>
                        <br></br>
                        <div className='searchContainer'>
                            <input type="text"
                                id='searchBar'
                                className='form-control form-control-md'
                                placeholder='Search...' required
                                name="search"
                            ></input>
                        </div>
                        <div className='propertiesBody'>
                            <div className='card-group'>
                                {
                                    propertiesList.map((property) => {

                                        return (

                                            <BookmarksCard
                                                key={property._id}
                                                property_details={property}
                                                imageWidth={imageWidth}
                                                imageHeight={imageHeight}
                                                flexDirection='row'
                                            />
                                        )
                                    })

                                }
                            </div>

                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Properties