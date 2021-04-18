import React, { useState } from 'react';
import { CSidebar, CSidebarNav, CSidebarNavItem, CNavItem, CButton, CRow, CLink } from '@coreui/react';
import { useDispatch } from "react-redux";
import logo from "../../Assets/logo.png";
import { useHistory } from "react-router-dom";
import { setBoardType } from "../../Actions/setBoradTypeAction";

export enum BoardType {
    All = "All",
    Immpressions = "Immpressions",
    Clicks = "Clicks",
    User = "User",
    CTR = "CTR"
}

const SideBar: React.FC = () => {
    const [showSideBar, setShowSideBar] = useState<boolean>(true);
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <CSidebar className="my-sidar" show={showSideBar}>
                <img className="m-4" src={logo}></img>
                <CSidebarNav>
                    <CSidebarNavItem>
                        <CLink className="c-sidebar-nav-link c-active" onClick={() => dispatch(setBoardType(BoardType.All))}>
                            All Metrics
                        </CLink>
                        <CLink className="c-sidebar-nav-link c-active" onClick={() => dispatch(setBoardType(BoardType.Immpressions))}>
                            Impressions
                        </CLink>
                        <CLink className="c-sidebar-nav-link c-active" onClick={() => dispatch(setBoardType(BoardType.Clicks))}>
                            Clicks
                        </CLink>
                        <CLink className="c-sidebar-nav-link c-active" onClick={() => dispatch(setBoardType(BoardType.User))}>
                            User
                        </CLink>
                        <CLink className="c-sidebar-nav-link c-active" onClick={() => dispatch(setBoardType(BoardType.CTR))}>
                            CTR
                        </CLink>
                    </CSidebarNavItem>
                </CSidebarNav>
                back
                <CButton className="c-sidebar-minimizer" onClick={() => {
                    dispatch(setBoardType(BoardType.All));
                    history.push('/');
                }
                }></CButton>
            </CSidebar>

        </>
    )
}

export default SideBar;