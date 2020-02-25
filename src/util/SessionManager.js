import {UserBuilder} from "./UserBuilder";
import React from "react";
import {appStore} from "../store/store";
import {addImages, login} from "../actions/actions";
import {ImageLoader} from "./ImageLoader";

export class SessionManager extends React.Component {
    constructor(props){
        super(props);
        this.update();
    }
    start=()=>{
        if(this.validSession() && !this.state.loggedIn()){
            let user = this.getSessionUser();
            this.login(user);
        }
    };
    login=(user)=>{
        const dispatch = appStore.dispatch;
        const puzzles = user.puzzles;
        if(puzzles.length > 0) {
            const dispatch = appStore.dispatch;
            const imageLoader = new ImageLoader();
            imageLoader.multiplePuzzles(puzzles).then((puzzleImages) => {
                dispatch(login(user,puzzleImages));
            });
        }else{
            dispatch(login(user,[]));
        }
    };
    update(){
        this.state = appStore.getState();
    }
    loadSession=()=>{
        const user = this.getSessionUser();
        this.login(user);
    };
    newSession=(obj)=>{
        obj.id = obj._id.$oid;
        const user = this.buildUser(obj);
        this.storeUser(user);
        this.storeExpiration();
        this.login(user);
    };
    destroySession=()=>{
        localStorage.clear();
    };
    getSessionUser=()=>{
        return this.buildUser(JSON.parse(localStorage.getItem('user')));
    };
    getSessionExpiration=()=>{
        let expString = localStorage.getItem('exp');
        return new Date(expString);
    };
    buildUser=(obj)=>{
        const userBuilder = new UserBuilder();
        return userBuilder.revive(obj);
    };
    storeUser=(user)=>{
        localStorage.setItem('user',JSON.stringify(user));
    };
    storeExpiration=()=>{
        const date = new Date();
        date.setHours(date.getHours()+8);
        localStorage.setItem('exp',JSON.stringify(date));
    };
    validSession=()=>{
        return this.hasSession() && !(this.expired());
    };
    expired=()=>{
        let now = new Date();
        let expiration = this.getSessionExpiration();
        return now >= expiration;
    };
    hasSession=()=>{
        let exp = localStorage.getItem('exp');
        let user = localStorage.getItem('user');
        return exp && user;
    };
}