import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import {App} from "./component/App";
import {store} from './reducers/reducer';


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);