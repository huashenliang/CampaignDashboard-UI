import React from 'react';
import {
    CContainer, CNavItem, CSidebar, CSidebarNav, CSidebarNavItem, CCardBody, CCard, CRow, CCol, CWidgetProgressIcon, CWidgetSimple, CWidgetIcon
} from "@coreui/react";
import SingleLineChart from "../../Components/Chart/LineChart/SingleLineChart";
import SimpleLineChartCard from "../../Components/Card/SimpleLineChartCard";
import { colorObj } from "../../Util/util";


type Props = {
    impressionData: number[],
    labelsArr: number[],
    counter: number,
    recentImpressions: number,
    conditiaonalColor: (current: number, arr: number[]) => string;
}

const ImpressionsBoard: React.FC<Props> = (props) => {
    const { impressionData, labelsArr, counter, recentImpressions, conditiaonalColor } = props;
    return (
        <CContainer className="mt-5" >
            <CRow className="mt-3">
                <CCol sm="12" lg="6">
                    <SimpleLineChartCard color="gradient-primary" text="Total Impressions"
                        pointHoverBackgroundColor="primary"
                        pointBackgroundColor={colorObj.impression.dark}
                        label="Impressions"
                        labels="Seconds"
                        chartData={impressionData}
                        showSum={true}
                    />
                </CCol>

                <CCol sm="12" lg="3">
                    <CWidgetSimple header="Current Number of Pull" text={(counter + 1).toString()} />
                </CCol>
                <CCol sm="12" lg="3">
                    <CWidgetSimple header="Recent Impressions" text={recentImpressions.toString()} style={{ color: conditiaonalColor(recentImpressions, impressionData) }} />
                </CCol>

            </CRow>

            <CRow>
                <CCol sm="12" lg="12">
                    <SingleLineChart header="Number of Impressions" label={"Impressions Number: "} data={impressionData} backgroundColor={colorObj.impression.light} labelsArr={labelsArr} />
                </CCol>

            </CRow>
        </CContainer>
    )
}

export default ImpressionsBoard;