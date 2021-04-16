import React, { useEffect, useState } from 'react';
import * as _ from "lodash";
import { CContainer, CCardBody, CCard, CRow, CCol } from "@coreui/react";
import { useParams, Redirect } from "react-router-dom";
import { RootStore } from "../../Store";
import { useSelector } from "react-redux";
import { fetchCampaginDetailById } from "../../Util/api";
import SimpleLineChartCard from "../../Components/Card/SimpleLineChartCard";
interface DashboardParams {
    id: string
}

interface CampaignData {
    impressions: number,
    clicks: number,
    users: number
}

const Dashboard: React.FC = () => {
    const [counter, setCounter] = useState(0);
    const [campaignDataArr, setCampaignDataArr] = useState<CampaignData[]>([]);
    const [recentCampaignData, setRecentCampaignData] = useState<CampaignData>();

    const param = useParams<DashboardParams>();
    const currentCampState = useSelector((state: RootStore) => state.currentCamp.campaignName);

    useEffect(() => {
        let mount = true;
        const fetchData = async () => {
            const result = await fetchCampaginDetailById(parseInt(param.id), counter);
            console.log(result);
            if (result.data && mount) {
                setCampaignDataArr(prevArr => [...prevArr, result.data]);
            }
        };
        fetchData();
        //set timer, run fetch data every 5 seconds
        const interval = setInterval(() => setCounter(counter + 1), 5000);
        //clearing when unmount
        return () => {
            clearInterval(interval);
            mount = false;
        }
    }, [counter]);

    if (_.isEmpty(param) || _.isEmpty(currentCampState)) {
        return <Redirect to="/" />
    }
    console.log(campaignDataArr);
    return (
        <CContainer className="mt-5">
            <h1>Dashboard: {recentCampaignData}</h1>
            <CCard className="mt-3">
                <CCardBody>
                    counter: {counter}
                    Recent Impressions: {recentCampaignData?.impressions}
                    Recent Clicks: {recentCampaignData?.clicks}
                    Recent Users: {recentCampaignData?.users}
                </CCardBody>
            </CCard>

            <CRow>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-primary" text="Members online" header="test"
                        pointHoverBackgroundColor="primary"
                        pointBackgroundColor="#1f1498"
                        label="Members"
                        labels="months" />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-info" text="Members online" header="test"
                        pointHoverBackgroundColor="primary"
                        label="Members"
                        labels="months"
                        pointBackgroundColor="#2982cc" />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-warning" text="Members online" header="test"
                        pointHoverBackgroundColor="primary"
                        label="Members"
                        labels="months"
                        pointBackgroundColor="#f9b115" />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-danger" text="Members online" header="test"
                        pointHoverBackgroundColor="primary"
                        label="Members"
                        labels="months"
                        pointBackgroundColor="#e55353" />
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Dashboard;
