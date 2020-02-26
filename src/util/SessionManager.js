import {UserBuilder} from "./UserBuilder";
import React from "react";
import {ImageLoader} from "./ImageLoader";
import {api} from "../component/App";

export class SessionManager{
    constructor(){}
    checkSession=()=>{
        return new Promise((resolve,reject)=>{
            if(this.validSession()){
                let user = this.getSessionUser();
                this.login(user).then((res)=>{
                    localStorage.setItem('user',JSON.stringify(res.user));
                    resolve(res)
                });
            }else{
                resolve(false);
            }
        });
    };
    login=(user)=>{
        return new Promise((resolve,reject)=>{
            api.getUser(user.id).then((res)=>{
                res.id = res._id.$oid;
                const user = this.buildUser(res);
                const puzzles = user.puzzles;
                if(puzzles.length > 0) {
                    const imageLoader = new ImageLoader();
                    imageLoader.multiplePuzzles(puzzles).then((puzzleImages) => {
                        resolve({user:user,images:puzzleImages});
                    });
                }else{
                    resolve({user:user,images:[]});
                }
            });
        });
    };
    updateSession=(user)=>{
        localStorage.setItem('user',JSON.stringify(user));
    };
    createSession=(obj)=>{
        return new Promise((resolve,reject)=> {
            obj.id = obj._id.$oid;
            const user = this.buildUser(obj);
            this.storeUser(user);
            this.storeExpiration();
            this.login(user).then((user)=>{
                resolve(user);
            });
        });
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