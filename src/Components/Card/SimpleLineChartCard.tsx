import React, { useEffect, useState } from 'react';
import { CWidgetDropdown, } from '@coreui/react';
import ChartLineSimple from "../Chart/ChartLineSimple";


type Props = {
    chartData: number[] | [],
    color: string,
    header: string,
    text: string,
    label: string,
    labels: string,
    pointBackgroundColor: string,
    pointHoverBackgroundColor: string,
}

const SimpleLineChartCard: React.FC<Props> = (props) => {

    const { chartData, color, header, text, pointBackgroundColor, pointHoverBackgroundColor, label, labels } = props;
    const [currentSum, setCurrentSum] = useState(0);

    const chunckDataArr = (chartData: number[]): number[] | [] => {
        if (chartData.length > 10) return chartData.slice(-10);
        return chartData;
    }

    useEffect(() => {
        if (chartData.length == 1) setCurrentSum(currentSum + chartData[0]);
        if (chartData.length > 1) setCurrentSum(currentSum + chartData[chartData.length - 1]);
    }, [chartData]);

    return (
        <CWidgetDropdown
            color={color}
            header={currentSum.toString()}
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