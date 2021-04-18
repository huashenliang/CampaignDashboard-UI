import React from 'react';
import DataBoard from "./DataBoard";
import SideBar from "../../Components/SideBar";
import DashBoardHeader from "../../Components/Header/DashBoardHeader";

const DashboardLayout: React.FC = () => {

    return (
        <div className="c-app c-default-layout">
            <SideBar />
            <div className="c-wrapper">
                <DashBoardHeader />
                <div className="c-body">
                    <DataBoard />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
