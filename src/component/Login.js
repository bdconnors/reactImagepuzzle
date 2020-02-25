import React from "react";
import {appStore} from "../store/store";
import {Api} from "../util/Api";
import {SessionManager} from "../util/SessionManager";

export class Login extends React.Component {
    constructor(props){
        super(props);
        this.update();
        this.state = {
            email: "",
            password: "",
            loginErr:""
        }
    };
    update() {
        this.storeState = appStore.getState();
    }
    componentDidMount() {
        this.update();
        if(this.storeState.loggedIn()){
            this.props.history.push('/');
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
        const api = new Api();
        api.login(this.state.email,this.state.password).then((res)=>{
            console.log(res);
            if(res.result != -1) {
                const sessionManager = new SessionManager();
                sessionManager.newSession(res.result);
                this.props.history.push('/');
            }else{
                this.setState({loginErr:'email or password incorrect'});
            }

        }).catch((e)=>{console.log(e)});
    };
    signUp=event=>{
        this.props.history.push('/register')
    };

    render() {
            return (<div>
                <h1>Image Puzzle Login</h1>
                <span style={{color: 'red'}}>{this.state.loginErr}</span>
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
