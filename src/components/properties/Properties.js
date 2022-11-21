import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import BookmarksCard from './BookmarksCard';
import Footer from '../footer/Footer';
import { renderSpinner } from '../common/CommonElements';
import { searchProperty } from '../../services/SearchService';
import { getAllProperties } from '../../services/PropertiesService';

import './Search.css';
import './Properties.css';


const Properties = () => {

    const [propertiesList, setAllPropertiesList] = useState([]);

    const [search, setSearch] = useState('');

    const [searchList, setSearchList] = useState([]);

    const [dataReady, setDataReady] = useState(false);

    const onSearchSubmit = () => {
        console.log("Search for : " + search);
        if (search === "" || search === null)
            setSearchList(propertiesList);
        else {
            async function getData() {
                await searchProperty(search)
                    .then(res => {
                        setSearchList(res);
                    })
            }
            getData();
        }

    }

    const handleChange = (e) => {
        setSearch(e.target.value.trim());
    }

    useEffect(() => {

        async function getData() {
            await getAllProperties()
                .then(res => {
                    setAllPropertiesList(res);
                    setSearchList(res);
                    setDataReady(true);
                });
        }

        getData();
    }, []);

    /* const imageWidth = '250px';
    const imageHeight = '200px'; */
    const imageWidth = '170px';
    const imageHeight = '120px';

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Sidebar />
                <div id='properties-container' style={{ width: '100%', backgroundColor: 'white' }}>
                    <div className="proeprtiesBody" style={{ maxHeight: '2600px' }}>
                        <h1 className='propertiesHeader'>Find your Stays</h1>
                        <br></br>
                        <div id='search-container' >

                            <div className='input-group'>
                                <input type="search"
                                    id="search-bar"
                                    className="form-control mr-sm-2"
                                    placeholder='Search for properties or location...'
                                    onChange={handleChange}
                                ></input>

                                <button className="btn btn-secondary"
                                    id='search-button'
                                    onClick={onSearchSubmit}>
                                    <i className="bi bi-search"></i>
                                </button>

                            </div>

                            <div id='search-results'>

                            </div>

                        </div>

                        {!dataReady ? renderSpinner() :
                            <div className='propertiesBody'>
                                {searchList.length !== 0 ?

                                    <div className='card-group'>
                                        {searchList?.map((property) => {
                                            return (
                                                <BookmarksCard
                                                    key={property._id}
                                                    property_details={property}
                                                    imageWidth={imageWidth}
                                                    imageHeight={imageHeight}
                                                    flexDirection='row'
                                                />
                                            )
                                        })}
                                    </div>
                                    : <h4 style={{ textAlign: 'center', paddingTop: '5%' }}>No Properties found...</h4>
                                }

                            </div>}


                        {/* <br></br>
                            <br></br>
                            <br></br>
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Properties
