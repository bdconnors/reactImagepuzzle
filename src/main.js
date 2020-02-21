import React from "react";
import {default as ReactDOM, render} from "react-dom";
import { Provider } from "react-redux";
import {store} from './reducers/reducer';
import{Route,BrowserRouter} from 'react-router-dom';
import {Upload} from "./component/Upload";
import {Puzzle} from "./component/Puzzle";
import {App} from "./component/App";
import {Register} from "./component/Register";


ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
            <div>
                <Route exact path="/" component={App}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/upload" component={Upload}/>
                <Route exact path="/puzzle" component={Puzzle}/>
            </div>
        </Provider>,
    </BrowserRouter>,
    document.getElementById('app')
);
