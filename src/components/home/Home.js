import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import './Home.css'

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar/>
            <div id='home-container'>
                <h1>Welcome to Airbnb</h1>

            </div>
        </div>
    )
}

export default Home