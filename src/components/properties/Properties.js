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

    const imageWidth = '250px';
    const imageHeight = '200px';

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            <div id='properties-container' style={{ width: '100%' }}>
                <div className="container rounded bg-white mt-5 mb-5" style={{ maxHeight: '2600px' }}>
                    <h1 className='propertiesHeading'>Find your Stays</h1>
                    <br></br>
                    <div className='card-group' /* style={{ overflowY: 'scroll', height: '60%', scrollBehavior: 'smooth' }} */
                        style={{ maxHeight: '800px', overflowY: 'scroll' }}
                    >
                        {
                            propertiesList.map((property, index) => {

                                return (
                                    // <SinglePropertyCard
                                    <PropertyCard
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
                </div>
            </div>
        </div>
    )
}

export default Properties