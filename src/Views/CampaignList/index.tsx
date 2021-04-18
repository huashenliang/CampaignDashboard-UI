import * as React from 'react';
import Datagrid from "../../Components/Datagrid";
import { CContainer, CCardBody, CCard, CFade } from "@coreui/react";
import mainlogo from ".././../Assets/mainlogo.png";
const CampaignList: React.FC = () => {

    return (
        <CContainer className="mt-5">
            <CFade>
                <div className="text-center">
                    <img className="main-logo" src={mainlogo}></img>
                </div>
                <CCard className="mt-3">
                    <CCardBody>
                        <Datagrid />
                    </CCardBody>
                </CCard>
            </CFade>
        </CContainer>
    );
};

export default CampaignList;
