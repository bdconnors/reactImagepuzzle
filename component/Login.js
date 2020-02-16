import React from "react";
import {RailsAPI} from "./RailsAPI";
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
