import * as React from 'react';
import Datagrid from "../../Components/Datagrid";
import { CContainer, CCardBody, CCard } from '@coreui/react'

const CampaignList: React.FC = () => {

    return (
        <CContainer className="mt-5">
            <h1>Campaign List</h1>
            <CCard className="mt-3">
                <CCardBody>
                    <Datagrid />
                </CCardBody>
            </CCard>
        </CContainer>
    );
};

export default CampaignList;
