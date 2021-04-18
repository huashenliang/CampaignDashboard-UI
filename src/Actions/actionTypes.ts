// login action types
export const CAMPAIGN_LOADING = "Campaign_LOADING";
export const CAMPAIGN_FAIL = "CAMPAIGN_FAIL";
export const CAMPAIGN_SUCCESS = "CAMPAIGN_SUCCESS";

export const SET_CURRENT_CAMP = "SET_CURRENT_CAMP";
export const SET_BOARD_TYPE = "SET_BOARD_TYPE";

// ============================== Campagin List ==============================
export type CampaignType = {
    campaigns: []
}

export interface CampaignLoading {
    type: typeof CAMPAIGN_LOADING
}

export interface CampaignFail {
    type: typeof CAMPAIGN_FAIL
}

export interface CampaignSuccess {
    type: typeof CAMPAIGN_SUCCESS,
    payload: CampaignType
}

export type CampaignDispatchTypes = CampaignLoading | CampaignFail | CampaignSuccess;


// ============================== Current Campagin ==============================
export interface CurrentCamp {
    type: typeof SET_CURRENT_CAMP,
    payload: string

}
export type CurrentCampDispatchTypes = CurrentCamp;

// ============================== Side Bar Actions ==============================
export interface CurrentBoardType {
    type: typeof SET_BOARD_TYPE,
    payload: string
}