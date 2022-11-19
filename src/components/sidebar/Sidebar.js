import React, { useState } from 'react'
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css';
import { SidebarData } from './SidebarData';
import Toast from '../toast/Toast';
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { removeToken } from '../common/CommonUtils';
import './Sidebar.css';

// import logo from './logo.jpg';
import logo from './logo3.svg';

const Sidebar = () => {

    const [menuCollapse, setMenuCollapse] = useState(false)
    const iconShape = 'round';
    const showSideBar = true;

    const [isLogOutOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }

    const navigate = useNavigate();

    const submitLogOut = async () => {

        console.log('Logout submitted');
        await removeToken()
            .then(navigate('/login'))
            .then(Toast('Successfully Logged out', 'success'))
    };


    const toggleSideBar = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
        console.log(menuCollapse);
    };

    return (

        <div id="sidebar-container" style={{ display: showSideBar ? 'block' : 'non', }}>

            <ProSidebar /* popperArrow="true" */ collapsed={menuCollapse} /* style={{display:"none"}} */ >
                <SidebarHeader>
                    <div className="logotext">
                        {/* Icon change using menucollapse state */}
                        {/* <p style={{ fontSize: "30px" }}>{menuCollapse ? <GiHamburgerMenu /> : <SiApacheairflow />} Airbnb </p> */}
                        <Link to='/home' style={{ color: '#ADADAD', textDecoration: 'none' }}>

                            <p style={{ fontSize: "30px", paddingTop: '3%', paddingLeft: '20%', font: 'sans-serif' }}>

                                <img src={logo} alt='App Logo' style={{ height: '40px', width: '40px' }}></img>
                                &nbsp;
                                {menuCollapse ? <></> : "Airdnd"}
                            </p>
                        </Link>
                    </div>
                    <div className="closemenu" onClick={toggleSideBar}>
                        {/* changing menu collapse icon on click */}
                        {menuCollapse ? (
                            <FiArrowRightCircle />
                        ) : (
                            <FiArrowLeftCircle />
                        )}
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    {
                        SidebarData.map(sidebarItem => {
                            return (
                                <Link to={sidebarItem.link} style={{ color: '#ADADAD' }} key={sidebarItem.id}>
                                    <Menu iconShape={iconShape} /* key={sidebarItem.id} */>
                                        <MenuItem icon={sidebarItem.icon}>{sidebarItem.name}</MenuItem>
                                    </Menu>
                                </Link>
                            )
                        }
                        )
                    }
                </SidebarContent>

                <SidebarFooter style={{ paddingBottom: "0%" }}>
                    <Menu iconShape={iconShape} style={{ color: '#e13131' }}>
                        <MenuItem icon={<FiLogOut />} onClick={setModalIsOpenToTrue}>Logout</MenuItem>
                    </Menu>
                </SidebarFooter>

            </ProSidebar>


            {renderLogoutPopup(isLogOutOpen, submitLogOut, setModalIsOpenToFalse)}

        </div>
    )
}


const renderLogoutPopup = (isLogOutOpen, submitLogOut, setModalIsOpenToFalse) => {
    return (
        <Modal show={isLogOutOpen} id='modal-id'>
            <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout ?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={submitLogOut}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={setModalIsOpenToFalse}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Sidebar
