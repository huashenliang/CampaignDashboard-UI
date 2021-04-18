import React from 'react';
import { CContainer, CRow, CCol, CWidgetSimple } from "@coreui/react";
import SingleLineChart from "../../Components/Chart/LineChart/SingleLineChart";
import SimpleLineChartCard from "../../Components/Card/SimpleLineChartCard";
import { DataObj } from "../../Util/util";

interface colorObj {
    main: string,
    light: string,
    dark: string,
}

type Props = {
    text: string,
    dataObj: DataObj,
    labelsArr: number[],
    colorObj: colorObj,
    counter: number,
    conditiaonalColor: (current: number, arr: number[]) => string;
}

const SingleTypeBoard: React.FC<Props> = (props) => {
    const { dataObj, labelsArr, counter, colorObj, text, conditiaonalColor } = props;
    console.log("rececntData: ", dataObj);
    return (
        <CContainer className="mt-5" >
            <CRow className="mt-3">
                <CCol sm="12" lg="6">
                    <SimpleLineChartCard color={colorObj.main} text={`Total ${text}`}
                        pointHoverBackgroundColor="primary"
                        pointBackgroundColor={colorObj.dark}
                        label={text}
                        labels="Seconds"
                        chartData={dataObj.dataArr}
                        showSum={true}
                        headerNumber={dataObj.totalNumber}
                    />
                </CCol>

                <CCol sm="12" lg="3">
                    <CWidgetSimple header="Current Number of Pull" text={(counter + 1).toString()} />
                </CCol>

                <CCol sm="12" lg="3">
                    <CWidgetSimple header={`Recent ${text}`} text={dataObj.recentNumber.toString()} style={{ color: conditiaonalColor(dataObj.recentNumber, dataObj.dataArr) }} />
                </CCol>
            </CRow>

            <CRow>
                <CCol sm="12" lg="12">
                    <SingleLineChart header={`Number of ${text}`} label={`${text} Number: `} data={dataObj.dataArr} backgroundColor={colorObj.light} labelsArr={labelsArr} />
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default SingleTypeBoard;