import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { campaignsReducer } from "./api/campaignsReducer";

export const rootReducer = {
    campaigns: campaignsReducer
};