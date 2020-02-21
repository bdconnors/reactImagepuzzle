import * as React from "react";
import {API} from '../constants/constants';
export class RailsAPI{
    constructor() {}
    login(email,password){
        return new Promise((resolve,reject)=> {
            fetch(API.base + API.login, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((res) => {
                resolve(res.json())
            }).catch((err) => {
                    reject(err);
                })
        });
    }
    register(firstName,lastName,email,password){
        return new Promise((resolve,reject)=> {
            fetch(API.base + API.users, {
                method: 'POST',
                body: JSON.stringify({
                    firstName:firstName,
                    lastName:lastName,
                    email: email,
                    password: password
                })
            }).then((res) => {
                resolve(res.json());
            }).catch((err) => {
                reject(err);
            })
        });
    }


}