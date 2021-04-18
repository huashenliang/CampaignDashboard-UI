import React from 'react';
import DataBoard from "./DataBoard";
import SideBar from "../../Components/SideBar";

const DashboardLayout: React.FC = () => {

    return (
        <div className="c-app c-default-layout">
            <SideBar />
            <div className="c-wrapper">
                <div className="c-body">
                    <DataBoard />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
