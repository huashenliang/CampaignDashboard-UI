import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { RootStore } from "../../Store";
import { useSelector } from "react-redux";
import { fetchCampaginDetailById } from "../../Util/api";
import { CContainer } from "@coreui/react";
import { BoardType } from "../../Components/SideBar";
import * as _ from "lodash";
import AllBoards from "./AllBoards";
import ImpressionsBoard from "./SingleTypeBoard";

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

const DataBoard: React.FC = () => {
    const [counter, setCounter] = useState(0);

    const [impressionData, setImpressionData] = useState<number[]>([]);
    const [clicksData, setClicksData] = useState<number[]>([]);
    const [usersData, setUsersData] = useState<number[]>([]);
    const [ctrData, setCtrData] = useState<number[]>([]);
    const [labelsArr, setLabelArr] = useState<number[]>([]);

    const [recentImpressions, setRecentImpressions] = useState<number>(0);
    const [recentClicks, setRecentClicks] = useState<number>(0);
    const [recentUsers, setRecentUsers] = useState<number>(0);
    const [recentCTR, setRecentCTR] = useState<number>(0);

    const param = useParams<DashboardParams>();
    const campaignName = useSelector((state: RootStore) => state.currentCamp.campaignName);
    const boardType = useSelector((state: RootStore) => state.currentBoard.boardType);

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
        setLabelArr(prev => [...prev, counter]);
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

    const conditionalRender = () => {
        switch (boardType) {
            case BoardType.All:
                return <AllBoards
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
                    labelsArr={labelsArr}
                    conditiaonalColor={conditiaonalColor} />

            case BoardType.Immpressions:
                return <ImpressionsBoard impressionData={impressionData} recentImpressions={recentImpressions}
                    counter={counter} conditiaonalColor={conditiaonalColor} labelsArr={labelsArr} />

            default:
                return <div></div>
        }
    }

    return (
        <CContainer className="mt-5" >
            {conditionalRender()}
        </CContainer>
    );
};

export default DataBoard;
