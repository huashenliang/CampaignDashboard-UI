import { Dispatch } from "react";
import { CAMPAIGN_FAIL, CAMPAIGN_SUCCESS, CAMPAIGN_LOADING, CampaignDispatchTypes } from "./actionTypes";
import { fetchCampaignList } from "../Util/api";

export const setCampaignList = () => async (dispatch: Dispatch<CampaignDispatchTypes>) => {
    try {
        dispatch({
            type: CAMPAIGN_LOADING
        })

        const res = await fetchCampaignList();

        dispatch({
            type: CAMPAIGN_SUCCESS,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: CAMPAIGN_FAIL
        })
    }

};
