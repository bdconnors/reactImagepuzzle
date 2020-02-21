import React from "react";
import {RailsAPI} from "./RailsAPI";
import { Base64 } from 'js-base64';

const api = new RailsAPI();
export class App extends React.Component {
    state = {
        email: "",
        password: "",
        loginErr:""

    };
    componentDidMount() {
        if(localStorage.getItem('user')){
            this.props.history.push('/upload');
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    login = event => {
        event.preventDefault();
        this.setState({loginErr:''});
        api.login(this.state.email,this.state.password).then((res)=>{
            if(res.result != false){
                console.log(res);
                localStorage.setItem('user',res.result);
                this.props.history.push('/upload');
            }else{
                this.setState({loginErr:'E-mail or password incorrect'});
            }

        }).catch((e)=>{
            console.log(e);
        });

    };
    signUp=event=>{
        this.props.history.push('/register')
    };
    render() {
            return (<div>
                <h1>Image Puzzle Login</h1>
                <span style={{color:'red'}}>{this.state.loginErr}</span>
                <br/>
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
                    onChange={this.handleChange}/>
                <br/>
                <button onClick={this.login}>Login</button>
                <button onClick={this.signUp}>Sign Up</button>
            </div>);
    }
}
