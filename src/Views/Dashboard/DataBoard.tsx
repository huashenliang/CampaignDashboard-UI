import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { RootStore } from "../../Store";
import { useSelector } from "react-redux";
import { fetchCampaginDetailById } from "../../Util/api";
import { CContainer } from "@coreui/react";
import { BoardType } from "../../Components/SideBar";
import * as _ from "lodash";
import AllBoards from "./AllBoards";
import SingleTypeBoard from "./SingleTypeBoard";
import { colorObj, DataObj, calculateRecentCTR, conditiaonalColor } from "../../Util/util";

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
    const param = useParams<DashboardParams>();

    const [counter, setCounter] = useState(0);

    const [impressionData, setImpressionData] = useState<DataObj>({ dataArr: [], recentNumber: 0, totalNumber: 0 });
    const [clicksData, setClicksData] = useState<DataObj>({ dataArr: [], recentNumber: 0, totalNumber: 0 });
    const [usersData, setUsersData] = useState<DataObj>({ dataArr: [], recentNumber: 0, totalNumber: 0 });
    const [ctrData, setCtrData] = useState<DataObj>({ dataArr: [], recentNumber: 0, totalNumber: 0 });
    const [labelsArr, setLabelArr] = useState<number[]>([]);

    const campaignName = useSelector((state: RootStore) => state.currentCamp.campaignName);
    const boardType = useSelector((state: RootStore) => state.currentBoard.boardType);

    //Handling impressions data
    const impressionHandler = (data: data) => {
        const impressionDataObj = {
            dataArr: [...impressionData.dataArr, data.impressions],
            recentNumber: data.impressions,
            totalNumber: impressionData.totalNumber + data.impressions
        }
        setImpressionData(impressionDataObj);
    }

    //Handling clicks data
    const clicksHandler = (data: data) => {
        const clicksDataObj = {
            dataArr: [...clicksData.dataArr, data.clicks],
            recentNumber: data.clicks,
            totalNumber: clicksData.totalNumber + data.clicks
        }
        setClicksData(clicksDataObj);
    }

    //Handling users data
    const usersHandler = (data: data) => {
        const usersDataObj = {
            dataArr: [...usersData.dataArr, data.users],
            recentNumber: data.users,
            totalNumber: usersData.totalNumber + data.users
        }
        setUsersData(usersDataObj);
    }

    //Handling ctrs data
    const ctrHandler = (clicksData: DataObj, impressionData: DataObj) => {
        const newTotalCtr = calculateRecentCTR(clicksData.totalNumber, impressionData.totalNumber);
        const recentCtr = calculateRecentCTR(clicksData.recentNumber, impressionData.recentNumber);
        const ctrDataObj = {
            dataArr: [...ctrData.dataArr, newTotalCtr],
            recentNumber: recentCtr,
            totalNumber: newTotalCtr
        }
        setCtrData(ctrDataObj);
    }

    //Setting all data objects
    const setAllData = (data: data) => {
        impressionHandler(data);
        clicksHandler(data);
        usersHandler(data);
        setLabelArr(prev => [...prev, counter]);
    }

    //Side effect for CTR data as ctr is based on clicks and impression
    useEffect(() => {
        const clicksLength = clicksData.dataArr.length;
        const impressLength = clicksData.dataArr.length;
        if (clicksLength && impressLength && clicksLength == impressLength) {
            ctrHandler(clicksData, impressionData);
        }
    }, [clicksData, impressionData])

    //Side effect when the counter increase - call api to fetch data
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
                    labelsArr={labelsArr}
                    conditiaonalColor={conditiaonalColor} />

            case BoardType.Immpressions:
                return <SingleTypeBoard dataObj={impressionData}
                    colorObj={colorObj.impression} text={BoardType.Immpressions}
                    counter={counter} conditiaonalColor={conditiaonalColor} labelsArr={labelsArr} />

            case BoardType.Clicks:
                return <SingleTypeBoard dataObj={clicksData}
                    colorObj={colorObj.click} text={BoardType.Clicks}
                    counter={counter} conditiaonalColor={conditiaonalColor} labelsArr={labelsArr} />

            case BoardType.User:
                return <SingleTypeBoard dataObj={usersData}
                    colorObj={colorObj.user} text={BoardType.User}
                    counter={counter} conditiaonalColor={conditiaonalColor} labelsArr={labelsArr} />

            case BoardType.CTR:
                return <SingleTypeBoard dataObj={ctrData}
                    colorObj={colorObj.ctr} text={BoardType.CTR}
                    counter={counter} conditiaonalColor={conditiaonalColor} labelsArr={labelsArr} />

            // default:
            //     return <AllBoards
            //         campaignName={campaignName}
            //         impressionData={impressionData}
            //         clicksData={clicksData}
            //         usersData={usersData}
            //         ctrData={ctrData}
            //         counter={counter}
            //         recentImpressions={recentImpressions}
            //         recentClicks={recentClicks}
            //         recentUsers={recentUsers}
            //         recentCTR={recentCTR}
            //         labelsArr={labelsArr}
            //         conditiaonalColor={conditiaonalColor} />
        }
    }

    return (
        <CContainer className="mt-5" >
            {conditionalRender()}
        </CContainer>
    );
};

export default DataBoard;
