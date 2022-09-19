import React, { useState } from 'react'
// import {Link} from 'react-router-dom';
// import styled from 'styled-components';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
//import Modal from 'react-modal';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

import 'react-pro-sidebar/dist/css/styles.css';
import { SidebarData } from './SidebarData';
import './Sidebar.css';
import Toast from '../toast/Toast';
import Cookies from 'js-cookie'
// import logo from './logo.jpg';


import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';

const Sidebar = () => {

    const [menuCollapse, setMenuCollapse] = useState(false)

    const logo = '/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABgAAAAAQAAAGAAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAPQBAAADoAQAAQAAAPQBAAAAAAAA/+ENYGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIyLTA5LTE5PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmZlMDA3MGM3LTE2ZTItNDkzMS04YThjLTE4N2RmODkwYjkxMTwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5EJmFtcDtEPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogIDx4bXA6Q3JlYXRvclRvb2w+Q2FudmE8L3htcDpDcmVhdG9yVG9vbD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAGBAUGBQQGBgUGBwcGCAoQCgoJCQoUDg8MEBcUGBgXFBYWGh0lHxobIxwWFiAsICMmJykqKRkfLTAtKDAlKCko/9sAQwEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+qaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKK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dFhm16GKC9cklIxjC9sjJwaqeHPBmjaAQ9nbb7gD/XSnc/4dh+FdHVxTW504elUjrUdwoooqjqCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKoavpFhrFsYNStY7iPsGHI9weo/Cr9FAmk1ZnE2vhPUvD28+FtSVbdn3myvE3Rknrhh8wrVs9Y1aP5dV0OdD08y1kWZD74yGH5GuhopWsQqaj8IA5APPPrRRRTNAooooAKKKKACiiigAooooAoapqD2Kp5dldXbvnCwIDj6kkAfnXPzyeLtUPl29vaaNAessjieXHsB8v5119FJoiUebqchovgLS7K7a9v9+pag7l2muMEbvUL0/nXXAADAGBS0UJWCMIw2QUUUUywooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9k='

    const iconShape = 'round';
    const isMenuCollapsed = false;

    const showSideBar = true;

    const [isLogOutOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }

    const navigate = useNavigate();

    const submitLogOut = event => {

        console.log('Logout submitted');
        console.log(Cookies.get('token'));
        Cookies.remove('token');
        navigate('/login');
        Toast('Successfully Logged out', 'success');
    };


    const toggleSideBar = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (

        <div id="sidebar-container" style={{ display: showSideBar ? 'block' : 'non' }}>

            <ProSidebar /* popperArrow="true" */ collapsed={menuCollapse} /* style={{display:"none"}} */ >
                <SidebarHeader>
                    <div className="logotext">
                        {/* Icon change using menucollapse state */}
                        {/* <p style={{ fontSize: "30px" }}>{menuCollapse ? <GiHamburgerMenu /> : <SiApacheairflow />} Airbnb </p> */}
                        <Link to='/home' style={{ color: '#ADADAD', textDecoration: 'none' }}>

                            <p style={{ fontSize: "30px", paddingTop: '3%', paddingLeft: '20%', font: 'sans-serif' }}>
                                {/* <img src={{ logo }} alt='App Logo'></img> Airdnd */}
                                {/* <img src='./logo.jpg' alt='App Logo' style={{height: '40px', width: '40px'}}></img> Airdnd */}
                                <img src={'data:image/jpg;base64, '  + logo} alt='App Logo' style={{height: '40px', width: '40px'}}></img> Airdnd
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
                        {/* <MenuItem icon={<FiLogOut />} onClick={() => alert('Alert Clicked')}>Logout</MenuItem> */}
                        <MenuItem icon={<FiLogOut />} onClick={setModalIsOpenToTrue}>Logout</MenuItem>
                    </Menu>
                </SidebarFooter>

            </ProSidebar>

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

        </div>
    )
}

export default Sidebar