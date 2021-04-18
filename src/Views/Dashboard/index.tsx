import React from 'react';
import DataBoard from "./DataBoard";
import SideBar from "../../Components/SideBar";
import DashBoardHeader from "../../Components/Header/DashBoardHeader";
import { CFade } from "@coreui/react";

const DashboardLayout: React.FC = () => {

    return (
        <div className="c-app c-default-layout">
            <SideBar />
            <div className="c-wrapper">
                <CFade>
                    <DashBoardHeader />
                    <div className="c-body">
                        <DataBoard />
                    </div>
                </CFade>
            </div>
        </div>
    )
}

export default DashboardLayout
