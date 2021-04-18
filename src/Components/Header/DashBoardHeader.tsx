import React from "react";
import { CContainer, CRow } from "@coreui/react";
import { RootStore } from "../../Store";
import { useSelector } from "react-redux";

const DashBoardHeader: React.FC = () => {
    const campaignName = useSelector((state: RootStore) => state.currentCamp.campaignName);
    const boardType = useSelector((state: RootStore) => state.currentBoard.boardType);
    return (
        <CContainer className="mt-5">
            <CRow>
                <h1>Campaign: {campaignName} - {boardType}</h1>
            </CRow>
        </CContainer>

    )
}

export default DashBoardHeader;