import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './Properties.css';
import { getAllProperties, getPropertyById, addNewProperty } from '../../services/PropertiesService';
import SinglePropertyCard from '../bookmarks/SinglePropertyCard';
import PropertyCard from './PropertyCard';


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
                                propertiesList.map((property, index) => {

                                    return (
                                        // <SinglePropertyCard
                                        <PropertyCard
                                            key={property._id}
                                            property_details={property}
                                            imageWidth={imageWidth}
                                            imageHeight={imageHeight}
                                            // cardWidth='30%'
                                            flexDirection='row'
                                        />
                                    )
                                })

                            }
                        </div>

                        <br></br>
                        <br></br>
                        <br></br>
                        {/* <div className='card-group'>
                            {
                                propertiesList.map((property, index) => {

                                    return (
                                        // <SinglePropertyCard
                                        <PropertyCard
                                            key={property._id}
                                            property_details={property}
                                            imageWidth={imageWidth}
                                            imageHeight={imageHeight}
                                            // cardWidth='30%'
                                            flexDirection='row'
                                        />
                                    )
                                })

                            }
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Properties