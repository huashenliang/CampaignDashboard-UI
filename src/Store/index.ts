import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "../Reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const Store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootStore = ReturnType<typeof RootReducer>

export default Store