import React from "react";
import { CContainer, CRow, CCol, CWidgetSimple } from "@coreui/react";
import SingleLineChart from "../../Components/Chart/LineChart/SingleLineChart";
import SimpleLineChartCard from "../../Components/Card/SimpleLineChartCard";
import { colorObj } from "../../Util/util";

type Props = {
    campaignName: string,
    impressionData: number[],
    clicksData: number[],
    usersData: number[],
    ctrData: number[],
    labelsArr: number[],
    counter: number,
    recentImpressions: number,
    recentClicks: number,
    recentUsers: number,
    recentCTR: number,
    conditiaonalColor: (current: number, arr: number[]) => string;
}


const AllBoards: React.FC<Props> = (props) => {

    const { campaignName, impressionData, clicksData, usersData, ctrData, labelsArr, counter, recentImpressions, recentClicks,
        recentUsers, recentCTR, conditiaonalColor } = props;

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
                    <SingleLineChart header="Number of Impressions" label={"Impressions Number: "} data={impressionData} backgroundColor={colorObj.impression.light} labelsArr={labelsArr} />
                    <SingleLineChart header="Number of Clicks" label={"Number of Clicks: "} data={clicksData} backgroundColor={colorObj.click.light} labelsArr={labelsArr} />
                    <SingleLineChart header="Number of Users Visited" label={"Number of Users Visted: "} data={usersData} backgroundColor={colorObj.user.light} labelsArr={labelsArr} />
                    <SingleLineChart header="Click Through Rate" label={"CTR: "} data={ctrData} backgroundColor={colorObj.ctr.light} labelsArr={labelsArr} />

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

}

export default AllBoards;