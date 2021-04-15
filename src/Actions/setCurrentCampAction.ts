import { Dispatch } from "react";
import { SET_CURRENT_CAMP, CurrentCampDispatchTypes } from "./actionTypes";
import { fetchCampaignList } from "../Util/api";

export const setCurrentCamp = (CampName: string) => async (dispatch: Dispatch<CurrentCampDispatchTypes>) => {
    dispatch({
        type: SET_CURRENT_CAMP,
        payload: CampName
    })
};
