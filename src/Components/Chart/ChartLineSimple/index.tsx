import React from 'react';
import { CChartLine } from '@coreui/react-chartjs';
const { getColor } = require('@coreui/utils');
const { deepObjectsMerge } = require('@coreui/utils');


type Props = {
    chartData?: number[],
    backgroundColor?: string,
    borderColor?: string,
    className: string,
    label: string,
    labels: string,
    pointBackgroundColor: string,
    pointHoverBackgroundColor: string,
    pointed: boolean,
    dataPoints: number[] | [],
    attributes?: any
    style?: {}
}


const ChartLineSimple: React.FC<Props> = props => {
    const {
        borderColor,
        backgroundColor,
        pointHoverBackgroundColor,
        dataPoints,
        label,
        pointed,
        pointBackgroundColor,
        ...attributes
    } = props

    const pointHoverColor = (() => {
        if (pointHoverBackgroundColor) {
            return pointHoverBackgroundColor
        } else if (backgroundColor !== 'transparent') {
            return backgroundColor
        }
        return borderColor
    })()

    const defaultDatasets = (() => {
        return [
            {
                data: dataPoints,
                borderColor: getColor(borderColor),
                backgroundColor: getColor(backgroundColor),
                pointBackgroundColor,
                pointHoverBackgroundColor: getColor(pointHoverColor),
                label
            }
        ]
    })()

    const pointedOptions = (() => {
        return {
            scales: {
                xAxes: [
                    {
                        offset: true,
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent'
                        }
                    }
                ],
                yAxes: [
                    {
                        display: false,
                        ticks: {
                            display: false,
                            min: Math.min.apply(Math, dataPoints) - 15,
                            max: Math.max.apply(Math, dataPoints) + 15
                        }
                    }
                ]
            },
            elements: {
                line: {
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    })()

    const straightOptions = (() => {
        return {
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }]
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    })()

    const defaultOptions = (() => {
        const options = pointed ? pointedOptions : straightOptions
        return Object.assign({}, options, {
            maintainAspectRatio: false,
            legend: {
                display: false
            }
        })
    })()

    const computedDatasets = (() => {
        return deepObjectsMerge(defaultDatasets, (attributes as any).datasets || {})
    })()

    const computedOptions = (() => {
        return deepObjectsMerge(defaultOptions, (attributes as any).options || {})
    })()

    // render
    return (
        <CChartLine
            {...attributes}
            datasets={computedDatasets}
            options={computedOptions}
            labels={label}
        />
    )
}

export default ChartLineSimple
