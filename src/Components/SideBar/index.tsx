import React from 'react';
import { CSidebar, CSidebarNav, CSidebarNavItem, CButton, CLink } from '@coreui/react';
import { useDispatch } from "react-redux";
import logo from "../../Assets/logo.png";
import { useHistory } from "react-router-dom";
import { setBoardType } from "../../Actions/setBoradTypeAction";

export enum BoardType {
    All = "All",
    Immpressions = "Immpressions",
    Clicks = "Clicks",
    User = "Users",
    CTR = "CTR"
}

const SideBar: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <CSidebar className="my-sidar" show={true}>
                <img className="m-4 slider-logo" src={logo} onClick={() => history.push('/')}></img>
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
                            Users
                        </CLink>
                        <CLink className="c-sidebar-nav-link c-active" onClick={() => dispatch(setBoardType(BoardType.CTR))}>
                            CTR
                        </CLink>
                    </CSidebarNavItem>
                </CSidebarNav>

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