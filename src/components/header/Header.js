import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {

  return (
    
    <div className='sticky-sm-top' >
      <h1 className='fw-normal mb-2 pb-2' style={{ paddingTop: 20, paddingBottom: 35, marginBottom: "35px", textAlign: 'center', borderLeft: "30%" }}>Airbnb</h1>
    </div>
  )
}

export default Header