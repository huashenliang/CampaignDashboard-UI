import { SET_CAMPAIGNLIST } from "./actionTypes";

export interface ICampaign {
    id: number,
    name: string
}

export type CampaignAction = {
    type: string,
    payload: ICampaign[]
}

export const setCampaignList = (campaignList: ICampaign[]): CampaignAction => ({
    type: SET_CAMPAIGNLIST,
    payload: campaignList,
});
