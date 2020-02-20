import React from "react";
import {RailsAPI} from "./RailsAPI";
import { Base64 } from 'js-base64';

const api = new RailsAPI();
export class Login extends React.Component {
    state = {
        email: "",
        password: "",

    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        api.login(this.state.email,this.state.password).then((result)=>{
            localStorage.setItem('token',result.token);
            console.log(localStorage.getItem('token'));
            let split = result.token.split('.');
            let head = split[0];
            let payload =split[1];
            let signature = split[2];
            console.log('head');
            console.log(Base64.decode(head));
            console.log('payload');
            console.log(JSON.parse(Base64.decode(payload)));
            console.log('signature');
            console.log(Base64.decode(signature));
        });

    };

    render() {
        return (<form onSubmit={this.handleSubmit}>
                <h1>Image Puzzle Login</h1>

                <label>E-Mail</label>
                <input
                    name='email'
                    placeholder='example@domain.com'
                    value={this.state.email}
                    onChange={this.handleChange}
                /><br/>

                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChange}/><br/>
                    <input type="submit" value = "Login"/>
        </form>)
    }
}
