import React, { useState } from 'react'
// import {Link} from 'react-router-dom';
// import styled from 'styled-components';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from 'react-pro-sidebar';
import { Link } from "react-router-dom";

import 'react-pro-sidebar/dist/css/styles.css';
import { SidebarData } from './SidebarData';
import './Sidebar.css';


import { GiHamburgerMenu } from 'react-icons/gi';
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { SiApacheairflow } from "react-icons/si";

/* import * as FaIcons from 'react-icons/fa';
import { BsCalendarWeek } from 'react-icons/bs';
import { ImProfile } from 'react-icons/im';
import { MdOutlinePayment } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillTelephoneFill, BsTelephoneFill } from 'react-icons/bs';
import { HiChevronDoubleRight } from 'react-icons/hi'
import { GiAbstract050 } from "react-icons/gi";
import { RiPencilLine } from "react-icons/ri"; */


const Sidebar = () => {

    const [menuCollapse, setMenuCollapse] = useState(false)

    const iconShape = 'round';
    const isMenuCollapsed = false;

    const toggleSideBar = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (

        <div id="sidebar-container">

            <ProSidebar /* popperArrow="true" */ collapsed={menuCollapse} /* style={{display:"none"}} */ >
                <SidebarHeader>
                    <div className="logotext">
                        {/* Icon change using menucollapse state */}
                        {/* <p style={{ fontSize: "30px" }}>{menuCollapse ? <GiHamburgerMenu /> : <SiApacheairflow />} Airbnb </p> */}
                        <Link to='/home' style={{color: '#ADADAD', textDecoration: 'none'}}>
                            <p style={{ fontSize: "30px", paddingTop: '3%', paddingLeft: '20%'}}>Airbnb</p>
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
                                <Link to={sidebarItem.link} style={{ color: '#ADADAD' }}>
                                    <Menu iconShape={iconShape} key={sidebarItem.id}>
                                        <MenuItem icon={sidebarItem.icon}>{sidebarItem.name}</MenuItem>
                                    </Menu>
                                </Link>
                            )
                        }
                        )
                    }
                </SidebarContent>

                <SidebarFooter style={{ paddingBottom: "0%" }}>
                    <Menu iconShape={iconShape} style={{color: '#e13131'}}>
                        <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                    </Menu>

                </SidebarFooter>
                {/* <Menu iconShape={iconShape}>
                        <MenuItem icon={<HiChevronDoubleRight />}></MenuItem>
                    </Menu> */}

            </ProSidebar>

        </div>
    )
}

export default Sidebar