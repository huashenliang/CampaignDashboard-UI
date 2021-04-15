import { CurrentCampDispatchTypes, SET_CURRENT_CAMP } from '../../Actions/actionTypes';

interface ICampaignState {
    campaignName: string
}

const initialState: ICampaignState = {
    campaignName: ''
}

export const currentCampReducer = (state: ICampaignState = initialState, action: CurrentCampDispatchTypes): ICampaignState => {
    switch (action.type) {
        case SET_CURRENT_CAMP:
            return {
                campaignName: action.payload
            }
        default:
            return state;
    }
}
