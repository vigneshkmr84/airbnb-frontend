import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './Properties.css';
import { getAllProperties } from '../../services/PropertiesService';
// import SinglePropertyCard from '../bookmarks/SinglePropertyCard';
import BookmarksCard from './BookmarksCard';
import Footer from '../footer/Footer';
import { searchProperty } from '../../services/SearchService';
import './Search.css';

const Properties = () => {

    const [allProperties, setAllPropertiesList] = useState([]);

    const [search, setSearch] = useState('');

    const [searchList, setSearchList] = useState([]);

    const onSearchSubmit = (e) => {
        console.log("Search for : " + search);
        // searchProperty(search);
        let searchProperty = allProperties.filter((property) => {
            if (property.name.toLowerCase().includes(search.toLowerCase()) || property.location.toLowerCase().includes(search.toLowerCase())) {
                return property;
            }
        });

        console.log(searchProperty);
        setSearchList(searchProperty);
    }

    const handleChange = (e) => {
        setSearch(e.target.value.trim());
    }

    useEffect(() => {
        async function getData() {
            let response = await fetch('properties.json')
                .then(function (data) {
                    return data.json();
                });

            setAllPropertiesList(response);
            setSearchList(response);
            return response;
        }


        getData();
        console.log(allProperties);

        // ORIGINAL CODE
        /* getAllProperties()
            .then((res) => {
                setAllPropertiesList(res);
            }) */

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
                    <div className="proeprtiesBody" style={{ maxHeight: '2600px' }}>
                        <h1 className='propertiesHeader'>Find your Stays</h1>
                        <br></br>
                        <div id='search-container' >

                            <div className='input-group'>
                                <input type="search"
                                    id="search-bar"
                                    className="form-control mr-sm-2"
                                    placeholder='Search'
                                    onChange={handleChange}
                                ></input>

                                <button className="btn btn-outline-secondary"
                                    id='search-button'
                                    onClick={onSearchSubmit}>
                                    <SearchButton />
                                </button>

                            </div>

                            <div id='search-results'>

                            </div>

                        </div>
                        <div className='propertiesBody'>
                            <div className='card-group'>
                                {searchList ?
                                    searchList.map((property) => {
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
                                    : <h4>No Data found</h4>
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

const SearchButton = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
        </svg>
    );
}

export default Properties