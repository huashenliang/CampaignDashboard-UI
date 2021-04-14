import { SET_CAMPAIGNLIST } from '../../Actions/actionTypes';
import { CampaignAction, ICampaign } from '../../Actions/getCampaignAction';

const initialState = {
    campaigns: []
}

export interface ICampaignState {
    campaigns: ICampaign[]
}

export const campaignsReducer = (state: ICampaignState = initialState, action: CampaignAction) => {
    switch (action.type) {
        case SET_CAMPAIGNLIST:
            return {
                ...state,
                campaigns: action.payload,
            }
        default:
            return state;
    }
}