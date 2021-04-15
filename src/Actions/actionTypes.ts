// login action types
export const CAMPAIGN_LOADING = "Campaign_LOADING";
export const CAMPAIGN_FAIL = "CAMPAIGN_FAIL";
export const CAMPAIGN_SUCCESS = "CAMPAIGN_SUCCESS";


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

export type CampaignDispatchTypes = CampaignLoading | CampaignFail | CampaignSuccess