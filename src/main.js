import React from "react";
import {default as ReactDOM, render} from "react-dom";
import{BrowserRouter} from 'react-router-dom';
import {App} from "./component/App";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('app')
);
