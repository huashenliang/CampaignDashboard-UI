import React, { useState } from 'react';
import { CSidebar, CSidebarNav, CSidebarNavItem, CNavItem, CButton, CRow, CLink } from '@coreui/react';
import logo from "../../Assets/logo.png";
import { useHistory } from "react-router-dom";

const SideBar: React.FC = () => {
    const [showSideBar, setShowSideBar] = useState<boolean>(true);
    const history = useHistory();

    return (
        <>
            <CSidebar className="my-sidar" show={showSideBar}>
                <img className="m-4" src={logo}></img>
                <CSidebarNav>
                    <CSidebarNavItem>
                        <CNavItem>
                            <CLink className="c-sidebar-nav-link c-active">
                                All Metrics
                        </CLink>
                        </CNavItem>
                        <CNavItem>
                            <CLink className="c-sidebar-nav-link c-active">
                                Impressions
                        </CLink>
                        </CNavItem>
                        <CNavItem>
                            <CLink className="c-sidebar-nav-link c-active">
                                Clicks
                        </CLink>
                        </CNavItem>
                        <CNavItem>
                            <CLink className="c-sidebar-nav-link c-active">
                                User
                        </CLink>
                        </CNavItem>
                        <CNavItem>
                            <CLink className="c-sidebar-nav-link c-active">
                                CTR
                        </CLink>
                        </CNavItem>
                    </CSidebarNavItem>
                </CSidebarNav>
                back
                <CButton className="c-sidebar-minimizer" onClick={() => { history.push('/') }}></CButton>
            </CSidebar>

        </>
    )
}

export default SideBar;