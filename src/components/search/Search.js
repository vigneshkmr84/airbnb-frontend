import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './Search.css'
import { searchProperty } from '../../services/SearchService';

const Search = () => {

    const [searchQuery, updateProperty] = useState('');

    const onSearchSubmit = (e) => {
        console.log("Search Submitted");
        console.log(searchQuery);
        searchProperty(searchQuery);
    }

    const handleChange = (e) => {
        updateProperty({
            searchQuery: e.target.value.trim(),
        })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            {/* <h1>Find your stay...</h1> */}
            <div id='search-container' /* style={{ width: '40%' }} */>

                <div className='input-group'>
                    <input type="search"
                        id="search-bar"
                        className="form-control mr-sm-2"
                        placeholder='Search'
                        onChange={handleChange}
                        // style={{width: '50%'}}
                        ></input>

                    <button className="btn btn-outline-secondary"
                        id='search-button'
                        onClick={onSearchSubmit}>
                        <ButtonImage />
                    </button>

                </div>

                <div id='search-results'>
                    
                </div>

            </div>
        </div>
    )
}

const ButtonImage = () => {
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

export default Search