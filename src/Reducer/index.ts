import { combineReducers } from "redux";
import { campaignsReducer } from "./api/campaignsReducer";
import { currentCampReducer } from "./ui/currentCampReducer";
import { boardTypeReducer } from "./ui/boardTypeReducer";

const RootReducer = combineReducers({
    campaigns: campaignsReducer,
    currentCamp: currentCampReducer,
    currentBoard: boardTypeReducer
});

export default RootReducer