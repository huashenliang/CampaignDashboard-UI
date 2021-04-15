import * as React from 'react';
import * as _ from "lodash";
import { CContainer, CCardBody, CCard } from "@coreui/react";
import { useParams, Redirect } from "react-router-dom";

interface DashboardParams {
    id: string
}

const Dashboard: React.FC = () => {

    const param = useParams<DashboardParams>();

    if (_.isEmpty(param)) {
        return <Redirect to="/" />
    }
    // console.log(param);

    return (
        <CContainer className="mt-5">
            <h1>Dashboard: </h1>
            <CCard className="mt-3">
                <CCardBody>

                </CCardBody>
            </CCard>
        </CContainer>
    );
};

export default Dashboard;
