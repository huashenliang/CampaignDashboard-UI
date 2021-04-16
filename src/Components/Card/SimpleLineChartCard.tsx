import React from 'react';
import { CWidgetDropdown, } from '@coreui/react';
import ChartLineSimple from "../Chart/ChartLineSimple";


type Props = {
    color: string,
    header: string,
    text: string,
    label: string,
    labels: string,
    pointBackgroundColor: string,
    pointHoverBackgroundColor: string,
}

const SimpleLineChartCard: React.FC<Props> = (props) => {

    return (
        <CWidgetDropdown
            color={props.color}
            header={props.header}
            text={props.text}
            footerSlot={
                <ChartLineSimple
                    pointed
                    className="c-chart-wrapper mt-3 mx-3"
                    style={{ height: '70px' }}
                    dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                    backgroundColor="rgba(255,255,255,.2)"
                    borderColor="rgba(255,255,255,.55)"
                    pointBackgroundColor={props.pointBackgroundColor}
                    pointHoverBackgroundColor={props.pointHoverBackgroundColor}
                    label={props.label}
                    labels={props.labels}
                />
            }
        >
        </CWidgetDropdown>
    )
}

export default SimpleLineChartCard;