import {AppReducer} from "../reducers/AppReducer";
import {createStore} from "redux";

export const reducer = new AppReducer();
export const appStore = createStore(reducer.reducer);