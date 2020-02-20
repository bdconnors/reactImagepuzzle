import React from "react";
import {RailsAPI} from "./RailsAPI";
const api = new RailsAPI();
export class SignUp extends React.Component {
    state = {
        email: "",
        emailConfirm:"",
        password: "",
        passwordConfirm:""

    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {


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
            />
            <br/>
            <label>Confirm E-Mail</label>
            <input
                name='emailConfirm'
                placeholder='example@domain.com'
                value={this.state.emailConfirm}
                onChange={this.handleChange}
            />
            <br/>
            <label>Password</label>
            <input
                type='password'
                name='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChange}
            />
            <br/>
            <label>Confirm Password</label>
            <input
                type='password'
                name='passwordConfirm'
                placeholder='Password'
                value={this.state.passwordConfirm}
                onChange={this.handleChange}
            />
            <br/>
            <input type="submit" value = "Submit"/>
        </form>)
    }
}
