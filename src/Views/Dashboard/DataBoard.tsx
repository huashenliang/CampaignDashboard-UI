import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { RootStore } from "../../Store";
import { useSelector } from "react-redux";
import { fetchCampaginDetailById } from "../../Util/api";
import SingleLineChart from "../../Components/Chart/LineChart/SingleLineChart";
import SimpleLineChartCard from "../../Components/Card/SimpleLineChartCard";
import {
    CContainer, CNavItem, CSidebar, CSidebarNav, CSidebarNavItem, CCardBody, CCard, CRow, CCol, CWidgetProgressIcon, CWidgetSimple, CWidgetIcon
} from "@coreui/react";
import logo from "../../Assets/logo.png";
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

const colorObj = {
    impression: {
        light: "#4e51c1",
        dark: "#1f1498"
    },
    click: {
        light: "#6da4e4",
        dark: "#2982cc"
    },
    user: {
        light: "#f0b764",
        dark: "#f9b115"
    },
    ctr: {
        light: "#da7673",
        dark: "#e55353"
    }
}
const DataBoard: React.FC = () => {
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

    const conditiaonalColor = (current: number, arr: number[]): string => {
        if (arr.length <= 1) return "";
        if (current < arr[arr.length - 2]) return "red";
        return "green";
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
            if (result.data as CampaignData && mount) setAllData(result.data);
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

        <CContainer className="mt-5" >
            <CRow>
                <CCol>
                    <h1>Campaign: {campaignName}</h1>
                </CCol>
            </CRow>

            <CRow className="mt-3">
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-primary" text="Total Impressions"
                        pointHoverBackgroundColor="primary"
                        pointBackgroundColor={colorObj.impression.dark}
                        label="Impressions"
                        labels="Seconds"
                        chartData={impressionData}
                        showSum={true}
                    />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-info" text="Total Clicks"
                        pointHoverBackgroundColor="primary"
                        label="Clicks"
                        labels="Seconds"
                        pointBackgroundColor={colorObj.click.dark}
                        chartData={clicksData}
                        showSum={true}
                    />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-warning" text="Total Users"
                        pointHoverBackgroundColor="primary"
                        label="Users"
                        labels="Seconds"
                        pointBackgroundColor={colorObj.user.dark}
                        chartData={usersData}
                        showSum={true}
                    />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-danger" text="Total CTR"
                        pointHoverBackgroundColor="primary"
                        label="CTR"
                        labels="Seconds"
                        pointBackgroundColor={colorObj.ctr.dark}
                        chartData={ctrData}
                        showSum={false}
                    />

                </CCol>
            </CRow>

            <CRow>
                <CCol sm="12" lg="9">
                    <SingleLineChart header="Number of Impressions" label={"Impressions Number: "} data={impressionData} backgroundColor={colorObj.impression.light} labelNumber={counter} />
                    <SingleLineChart header="Number of Clicks" label={"Number of Clicks: "} data={clicksData} backgroundColor={colorObj.click.light} labelNumber={counter} />
                    <SingleLineChart header="Number of Users Visited" label={"Number of Users Visted: "} data={usersData} backgroundColor={colorObj.user.light} labelNumber={counter} />
                    <SingleLineChart header="Click Through Rate" label={"CTR: "} data={ctrData} backgroundColor={colorObj.ctr.light} labelNumber={counter} />

                </CCol>
                <CCol sm="12" lg="3">
                    <CWidgetSimple header="Current Number of Pull" text={(counter + 1).toString()} />
                    <CWidgetSimple header="Recent CTR" text={recentCTR.toString()} style={{ color: conditiaonalColor(recentCTR, ctrData) }} />
                    <CWidgetSimple header="Recent Clicks" text={recentClicks.toString()} style={{ color: conditiaonalColor(recentClicks, clicksData) }} />
                    <CWidgetSimple header="Recent Users" text={recentUsers.toString()} style={{ color: conditiaonalColor(recentUsers, usersData) }} />
                    <CWidgetSimple header="Recent Impressions" text={recentImpressions.toString()} style={{ color: conditiaonalColor(recentImpressions, impressionData) }} />
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default DataBoard;
