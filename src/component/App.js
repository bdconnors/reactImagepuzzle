import React from "react";
import {default as ReactDOM, render} from "react-dom";
import { Provider } from "react-redux";
import {Login} from "./Login";
import {Register} from "./Register";
import {Upload} from "./Upload";
import {Canvas} from "./Canvas";
import {Dashboard} from "./Dashboard";
import {Route} from "react-router-dom"
import {appStore} from "../store/store";
import {SessionManager} from "../util/SessionManager";
const sessionManager = new SessionManager();

export class App extends React.Component{
    constructor(props){
        super(props);
        this.update();
        sessionManager.start();
    }
    componentDidMount() {
        this.update();
    }

    update(){
        this.state = appStore.getState();
    }
    render(){
        return (<Provider store={appStore}>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/upload" component={Upload}/>
                <Route exact path="/puzzle/:id" component={Canvas}/>
        </Provider>);
    }
}

