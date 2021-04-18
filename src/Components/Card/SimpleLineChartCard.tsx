import React, { useEffect, useState } from 'react';
import { CWidgetDropdown, } from '@coreui/react';
import ChartLineSimple from "../Chart/ChartLineSimple";


type Props = {
    chartData: number[] | [],
    headerNumber: number,
    color: string,
    text: string,
    label: string,
    labels: string,
    showSum: boolean,
    pointBackgroundColor: string,
    pointHoverBackgroundColor: string,
}

const SimpleLineChartCard: React.FC<Props> = (props) => {

    const { chartData, headerNumber, color, text, pointBackgroundColor, pointHoverBackgroundColor, label, labels, showSum } = props;

    const chunckDataArr = (chartData: number[]): number[] | [] => {
        if (chartData.length > 10) return chartData.slice(-10);
        return chartData;
    }

    //conditional for CTR number
    // const conditionalCalculaion = () => {
    //     if (showSum) {
    //         if (chartData.length == 1) setCurrentSum(currentSum + chartData[0]);
    //         if (chartData.length > 1) setCurrentSum(currentSum + chartData[chartData.length - 1]);
    //     } else {
    //         if (chartData.length == 1) setCurrentNum(chartData[0]);
    //         if (chartData.length > 1) setCurrentNum(chartData[chartData.length - 1]);
    //     }
    // }

    return (
        <CWidgetDropdown
            color={color}
            header={headerNumber.toFixed(2)}
            text={text}
            footerSlot={
                <ChartLineSimple
                    pointed
                    className="c-chart-wrapper mt-3 mx-3"
                    style={{ height: '100px' }}
                    dataPoints={chunckDataArr(chartData)}
                    backgroundColor="rgba(255,255,255,.2)"
                    borderColor="rgba(255,255,255,.55)"
                    pointBackgroundColor={pointBackgroundColor}
                    pointHoverBackgroundColor={pointHoverBackgroundColor}
                    label={label}
                    labels={labels}
                />
            }
        >
        </CWidgetDropdown>
    )
}

export default SimpleLineChartCard;