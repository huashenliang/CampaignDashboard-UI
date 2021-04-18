import React from 'react';
import { CSidebar, CSidebarNav, CSidebarNavItem, CNavItem } from '@coreui/react';
import logo from "../../Assets/logo.png";

const SideBar: React.FC = () => {

    return (
        <CSidebar className="my-sidar" show={true}>
            <img className="m-4" src={logo}></img>
            <CSidebarNav>
                <CSidebarNavItem>
                    <CNavItem>
                        testing
                </CNavItem>
                </CSidebarNavItem>
            </CSidebarNav>
        </CSidebar>)
}

export default SideBar;