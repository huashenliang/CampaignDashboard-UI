import { combineReducers } from "redux";
import { campaignsReducer } from "./api/campaignsReducer";
import { currentCampReducer } from "./ui/currentCampReducer";

const RootReducer = combineReducers({
    campaigns: campaignsReducer,
    currentCamp: currentCampReducer
});

export default RootReducer