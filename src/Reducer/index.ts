import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { campaignsReducer } from "./api/campaignsReducer";


const RootReducer = combineReducers({
    campaigns: campaignsReducer
});

export default RootReducer