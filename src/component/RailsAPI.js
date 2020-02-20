import * as React from "react";
import {API} from '../constants/constants';
export class RailsAPI{
    constructor() {
        this.error = null;
        this.isLoaded = false;
        this.items = [];
    }
    login(email,password){
        return new Promise((resolve,reject)=> {
            fetch(API.base + API.login, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((res) => {
                res.json().then((result)=>{
                    resolve(result);
                });
            }).catch((error) => {
                    this.isLoaded = true;
                    this.error = error;
                    reject(this.error);
                })
        });
    }

}