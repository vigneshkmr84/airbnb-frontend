import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({title}) => {
  
  return (
    // <div className='jumbotron'>
    <div /* className='header col-md-12' */ className='sticky-sm-top'>
        <h1 className='fw-normal mb-2 pb-2' style={{paddingTop: 20, paddingBottom: 35, marginBottom: "35px", textAlign: 'center'}}>Airbnb</h1> 
    </div>  
  )
}

export default Header