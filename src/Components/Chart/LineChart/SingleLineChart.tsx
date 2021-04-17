import React, { useEffect, useState } from "react";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";
import { CChartLine } from '@coreui/react-chartjs';


type Props = {
    header: string,
    label: string,
    backgroundColor: string,
    data: number[],
    labelNumber: number
}

const SingleLineChart: React.FC<Props> = (props) => {

    const { header, label, backgroundColor, data, labelNumber } = props;
    const [labelsArr, setLabelArr] = useState<number[]>([]);

    useEffect(() => {
        setLabelArr(prev => [...prev, labelNumber])
    }, [labelNumber]);

    const defaultOptions = (() => {
        return {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                        display: true
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                    },
                    gridLines: {
                        display: true
                    }
                }]
            },
            elements: {
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3
                }
            }
        }
    }
    )()

    return (
        <CCard>
            <CCardHeader>
                <h2>{header}</h2>
            </CCardHeader>
            <CCardBody>
                <CChartLine
                    datasets={[
                        {
                            label, backgroundColor, data
                        }
                    ]}
                    options={defaultOptions}
                    labels={labelsArr}
                />
            </CCardBody>
        </CCard>
    )
}

export default SingleLineChart;