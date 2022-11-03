import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './Search.css'
import { searchProperty } from '../../services/SearchService';

const Search = () => {

    const [searchQuery, updateProperty] = useState('');

    const onSearchSubmit = () => {
        console.log("Search Submitted");
        console.log(searchQuery);
        searchProperty(searchQuery);
    }

    const handleChange = (e) => {
        if (e.key === 'Enter')
            console.log('Enter pressed');
        updateProperty({
            searchQuery: e.target.value.trim(),
        })
    }

    const handleEnterPress = (event) => {
        console.log('key press check')
        if (event.key === 'Enter') {
            console.log('Enter press')
            onSearchSubmit();
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            <div id='search-container' /* style={{ width: '40%' }} */>

                <div className='input-group'>
                    <input type="search"
                        id="search-bar"
                        className="form-control mr-sm-2"
                        placeholder='Search'
                        onChange={handleChange}
                        onKeyPress={handleEnterPress}
                    // style={{width: '50%'}}
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
        </div>
    )
}

export default Search
