import {API} from '../constants/constants';
export class Api{
    constructor() {}
    login=(email,password)=>{
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
    };
    register=(firstName,lastName,email,password)=>{
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
    };
    updatePuzzles=(userId,puzzles)=>{
        let body = JSON.stringify(puzzles);
        console.log(body);
        return new Promise((resolve,reject)=> {
            fetch(API.base + API.users+"/"+userId, {
                method: 'PUT',
                body: body
            }).then((res) => {
                resolve(res.json());
            }).catch((err) => {
                reject(err);
            })
        });
    };
    getUser=(id)=>{
        return new Promise((resolve,reject)=> {
            fetch(API.base + API.users+"/"+id, {
                method: 'GET'
            }).then((res) => {
                resolve(res.json());
            }).catch((err) => {
                reject(err);
            })
        });
    };

}