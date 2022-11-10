import React from 'react'

export const NotFound = () => {
    return (
        <div style={{ paddingTop: '3%', textAlign: 'center', width: '100%' }}>
            <div className='row'>
                <h1>404 Not found.</h1>
            </div>
            <div className='row'></div>
            <div className='row'>
                <h5>Click here to redirect to <a href="./home">Home</a></h5>
            </div>
        </div>

    )
}
