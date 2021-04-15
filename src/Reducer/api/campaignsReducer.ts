import { CAMPAIGN_FAIL, CAMPAIGN_LOADING, CAMPAIGN_SUCCESS, CampaignDispatchTypes, CampaignType } from '../../Actions/actionTypes';
interface ICampaignState {
    loading: boolean,
    campaignList?: CampaignType
}

const initialState: ICampaignState = {
    loading: false
}

export const campaignsReducer = (state: ICampaignState = initialState, action: CampaignDispatchTypes): ICampaignState => {
    switch (action.type) {
        case CAMPAIGN_FAIL:
            return {
                loading: false
            }
        case CAMPAIGN_LOADING:
            return {
                loading: true
            }
        case CAMPAIGN_SUCCESS:
            return {
                loading: false,
                campaignList: action.payload
            }
        default:
            return state;
    }
}
