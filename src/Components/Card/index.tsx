import React from 'react';
import { CWidgetDropdown, } from '@coreui/react';
import ChartLineSimple from "../Chart/ChartLineSimple";

const Card: React.FC = () => {

    return (
        <CWidgetDropdown
            color="gradient-primary"
            header="9.823"
            text="Members online"
            footerSlot={
                <ChartLineSimple
                    pointed
                    className="c-chart-wrapper mt-3 mx-3"
                    style={{ height: '70px' }}
                    dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                    backgroundColor="rgba(255,255,255,.2)"
                    borderColor="rgba(255,255,255,.55)"
                    pointHoverBackgroundColor="primary"
                    label="Members"
                    labels="months"
                />
            }
        >
        </CWidgetDropdown>
    )
}

export default Card;