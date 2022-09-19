import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <ul>
                <li>Copyright &copy; 2022 &bull; This application is solely for learning purposes and falls under <a href="https://opensource.org/licenses/MIT">MIT Liscense</a></li>
                {/* <li>Liscense - MIT Lis</li> */}
            </ul>
            {/* <p style={{ margin: 'auto' }}>Copyright &copy; 2022
                &bull; This application is solely for learning purposes and falls under <a href="https://opensource.org/licenses/MIT">MIT Liscense</a>
            </p> */}
        </div>
    )
}

export default Footer