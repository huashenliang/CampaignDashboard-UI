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
import * as _ from "lodash";
import AllBoards from "./AllBoards";

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

export const colorObj = {
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
            <AllBoards
                campaignName={campaignName}
                impressionData={impressionData}
                clicksData={clicksData}
                usersData={usersData}
                ctrData={ctrData}
                counter={counter}
                recentImpressions={recentImpressions}
                recentClicks={recentClicks}
                recentUsers={recentUsers}
                recentCTR={recentCTR}
                conditiaonalColor={conditiaonalColor} />
        </CContainer>
    );
};

export default DataBoard;
