import * as React from 'react';
import Datagrid from "../../Components/Datagrid";
import { CContainer, CRow, CCardBody, CCard, CFade } from '@coreui/react'

const CampaignList: React.FC = () => {


    return (
        <CContainer>
            <CCard>
                <CCardBody>
                    <Datagrid />
                </CCardBody>
            </CCard>
        </CContainer>
    );
};

export default CampaignList;
