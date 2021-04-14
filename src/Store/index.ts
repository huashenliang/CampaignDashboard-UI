import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../Reducer";

export const store = createStore(rootReducer as any, applyMiddleware(thunk));