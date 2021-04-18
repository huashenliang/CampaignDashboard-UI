import React from "react";
import { CContainer, CRow, CCol, CWidgetSimple } from "@coreui/react";
import SingleLineChart from "../../Components/Chart/LineChart/SingleLineChart";
import SimpleLineChartCard from "../../Components/Card/SimpleLineChartCard";
import { colorObj, DataObj } from "../../Util/util";

type Props = {
    campaignName: string,
    impressionData: DataObj,
    clicksData: DataObj,
    usersData: DataObj,
    ctrData: DataObj,
    labelsArr: number[],
    counter: number,
    conditiaonalColor: (current: number, arr: number[]) => string;
}


const AllBoards: React.FC<Props> = (props) => {

    const { campaignName, impressionData, clicksData, usersData, ctrData, labelsArr, counter, conditiaonalColor } = props;

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
                        chartData={impressionData.dataArr}
                        showSum={true}
                        headerNumber={impressionData.totalNumber}
                    />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-info" text="Total Clicks"
                        pointHoverBackgroundColor="primary"
                        label="Clicks"
                        labels="Seconds"
                        pointBackgroundColor={colorObj.click.dark}
                        chartData={clicksData.dataArr}
                        showSum={true}
                        headerNumber={clicksData.totalNumber}
                    />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-warning" text="Total Users"
                        pointHoverBackgroundColor="primary"
                        label="Users"
                        labels="Seconds"
                        pointBackgroundColor={colorObj.user.dark}
                        chartData={usersData.dataArr}
                        showSum={true}
                        headerNumber={usersData.totalNumber}
                    />
                </CCol>
                <CCol sm="6" lg="3">
                    <SimpleLineChartCard color="gradient-danger" text="Total CTR"
                        pointHoverBackgroundColor="primary"
                        label="CTR"
                        labels="Seconds"
                        pointBackgroundColor={colorObj.ctr.dark}
                        chartData={ctrData.dataArr}
                        showSum={false}
                        headerNumber={ctrData.totalNumber}
                    />

                </CCol>
            </CRow>

            <CRow>
                <CCol sm="12" lg="9">
                    <SingleLineChart header="Number of Impressions" label={"Impressions Number: "}
                        data={impressionData.dataArr} backgroundColor={colorObj.impression.light} labelsArr={labelsArr} />

                    <SingleLineChart header="Number of Clicks" label={"Number of Clicks: "}
                        data={clicksData.dataArr} backgroundColor={colorObj.click.light} labelsArr={labelsArr} />

                    <SingleLineChart header="Number of Users Visited" label={"Number of Users Visted: "}
                        data={usersData.dataArr} backgroundColor={colorObj.user.light} labelsArr={labelsArr} />

                    <SingleLineChart header="Click Through Rate" label={"CTR: "}
                        data={ctrData.dataArr} backgroundColor={colorObj.ctr.light} labelsArr={labelsArr} />

                </CCol>
                <CCol sm="12" lg="3">
                    <CWidgetSimple header="Current Number of Pull" text={(counter + 1).toString()} />

                    <CWidgetSimple header="Recent CTR" text={ctrData.recentNumber.toString()}
                        style={{ color: conditiaonalColor(ctrData.recentNumber, ctrData.dataArr) }} />

                    <CWidgetSimple header="Recent Clicks" text={clicksData.recentNumber.toString()}
                        style={{ color: conditiaonalColor(clicksData.recentNumber, clicksData.dataArr) }} />

                    <CWidgetSimple header="Recent Users" text={usersData.recentNumber.toString()}
                        style={{ color: conditiaonalColor(usersData.recentNumber, usersData.dataArr) }} />

                    <CWidgetSimple header="Recent Impressions" text={impressionData.recentNumber.toString()}
                        style={{ color: conditiaonalColor(impressionData.recentNumber, impressionData.dataArr) }} />
                </CCol>
            </CRow>
        </CContainer>
    );

}

export default AllBoards;