import * as React from 'react';
import * as _ from "lodash";
import { CContainer, CCardBody, CCard } from "@coreui/react";
import { useParams, Redirect } from "react-router-dom";
import { RootStore } from "../../Store";
import { useSelector } from "react-redux";

interface DashboardParams {
    id: string
}

const Dashboard: React.FC = () => {

    const param = useParams<DashboardParams>();
    const currentCampState = useSelector((state: RootStore) => state.currentCamp.campaignName);
    if (_.isEmpty(param) || _.isEmpty(currentCampState)) {
        return <Redirect to="/" />
    }

    return (
        <CContainer className="mt-5">
            <h1>Dashboard: {currentCampState}</h1>
            <CCard className="mt-3">
                <CCardBody>

                </CCardBody>
            </CCard>
        </CContainer>
    );
};

export default Dashboard;
