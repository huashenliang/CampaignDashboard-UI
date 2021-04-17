import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { RootStore } from "../../Store";
import { useSelector } from "react-redux";
import { fetchCampaginDetailById } from "../../Util/api";
import SingleLineChart from "../../Components/Chart/LineChart/SingleLineChart";
import SimpleLineChartCard from "../../Components/Card/SimpleLineChartCard";
import { CContainer, CCardBody, CCard, CRow, CCol, CWidgetProgressIcon, CWidgetSimple } from "@coreui/react";
import * as _ from "lodash";

interface DashboardParams {
    id: string
}

interface data {
    impressions: number,
    clicks: number,
    users: number
}
interface CampaignData {
    impressions: number,
    clicks: number,
    users: number
}

const Dashboard: React.FC = () => {
    const [counter, setCounter] = useState(0);

    const [impressionData, setImpressionData] = useState<number[]>([]);
    const [clicksData, setClicksData] = useState<number[]>([]);
    const [usersData, setUsersData] = useState<number[]>([]);
    const [ctrData, setCtrData] = useState<number[]>([]);

    const [recentImpressions, setRecentImpressions] = useState<number>(0);
    const [recentClicks, setRecentClicks] = useState<number>(0);
    const [recentUsers, setRecentUsers] = useState<number>(0);
    const [recentCTR, setRecentCTR] = useState<number>(0);

    const param = useParams<DashboardParams>();
    const campaignName = useSelector((state: RootStore) => state.currentCamp.campaignName);

    //Calculating total CTR by (total clicks/ total impressions * 100)
    const calculateCtr = (clicksArr: number[], impressionsArr: number[]): number => {
        return Number((_.sum(clicksArr) / _.sum(impressionsArr) * 100).toFixed(2));
    }

    const calculateRecentCTR = (clicks: number, impression: number): number => {
        return Number((clicks / impression * 100).toFixed(2));
    }

    const setAllData = (data: data) => {
        setRecentClicks(data.clicks);
        setRecentUsers(data.users);
        setRecentImpressions(data.impressions);
        setRecentCTR(calculateRecentCTR(data.clicks, data.impressions));
        setImpressionData(prev => [...prev, data.impressions]);
        setClicksData(prev => [...prev, data.clicks]);
        setUsersData(prev => [...prev, data.users]);
    }

    useEffect(() => {
        if (clicksData.length && impressionData.length && clicksData.length == impressionData.length) {
            setCtrData(prev => [...prev, calculateCtr(clicksData, impressionData)]);
        }
    }, [clicksData, impressionData])


    useEffect(() => {
        let mount = true;
        const fetchData = async () => {
            const result = await fetchCampaginDetailById(parseInt(param.id), counter);
            if (result.data && mount) setAllData(result.data);
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

    if (_.isEmpty(param) || _.isEmpty(campaignName)) {
        return <Redirect to="/" />
    }

    return (
        <CContainer className="mt-5">
            <CRow>
                <CCol>
                    <h1>Campaign: {campaignName}</h1>
                </CCol>
            </CRow>

            <CRow className="mt-3">
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-primary" text="Total Impressions"
                        pointHoverBackgroundColor="primary"
                        pointBackgroundColor="#1f1498"
                        label="Members"
                        labels="months"
                        chartData={impressionData}
                        showSum={true}
                    />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-info" text="Total Clicks"
                        pointHoverBackgroundColor="primary"
                        label="Members"
                        labels="months"
                        pointBackgroundColor="#2982cc"
                        chartData={clicksData}
                        showSum={true}
                    />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-warning" text="Total Users"
                        pointHoverBackgroundColor="primary"
                        label="Members"
                        labels="months"
                        pointBackgroundColor="#f9b115"
                        chartData={usersData}
                        showSum={true}
                    />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-danger" text="Total CTR"
                        pointHoverBackgroundColor="primary"
                        label="CTR"
                        labels="Seconds"
                        pointBackgroundColor="#e55353"
                        chartData={ctrData}
                        showSum={false}
                    />

                </CCol>
            </CRow>

            <CRow>
                <CCol sm="12" lg="9">
                    <SingleLineChart label={"Impressions Number: "} data={impressionData} backgroundColor="#4e51c1" labelNumber={counter} />
                </CCol>
                <CCol sm="12" lg="3">
                    <CWidgetSimple header="Current Number of Pull" text={(counter + 1).toString()} />
                    <CWidgetSimple header="Recent CTR" text={recentCTR.toString()} />
                    <CWidgetSimple header="Recent Clicks" text={recentClicks.toString()} />
                    <CWidgetSimple header="Recent Users" text={recentUsers.toString()} />
                    <CWidgetSimple header="Recent Impressions" text={recentImpressions.toString()} />
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Dashboard;
