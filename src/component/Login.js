import React from "react";
import {appStore} from "../store/store";
import {api} from "./App";
import {sessionManager} from "./App";

export class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = appStore.getState();
        this.state.loading = 'initial';

    };

    componentDidMount() {
        if(this.state.loggedIn === 'true') {
            this.props.history.push('/');
        }else{
            this.setState({loading:'true'});
            sessionManager.checkSession().then((result) => {
                this.setState({loading: 'false'});
                if (result !== false) {
                    this.setState({
                        user: result.user,
                        images: result.images,
                        loggedIn:'true'
                    });
                    this.props.history.push('/');
                }
            });
        }
    }
    login = event => {
        this.setState({err:''});
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        api.login(email,password).then((res)=>{
            console.log(res);
            if(res.result != -1) {
                sessionManager.createSession(res.result).then((result)=>{
                    this.setState({
                        user: result.user,
                        images: result.images,
                        loggedIn:'true'
                    });
                    this.props.history.push('/');
                });
            }else{
                this.setState({err:'email or password incorrect'});
            }

        }).catch((e)=>{console.log(e)});
    };
    signUp=event=>{
        this.props.history.push('/register')
    };

    render() {
        console.log(this.state);
        if (this.state.loading === 'initial') {
            console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
            return <h2>Intializing...</h2>;
        } else if (this.state.loading === 'true') {
            console.log('This happens 5th - when waiting for data.');
            return <h2>Loading...</h2>;
        }
            return (<div>
                <h1>Image Puzzle Login</h1>
                <span style={{color: 'red'}}>{this.state.err}</span>
                <br/>
                <label>E-Mail</label>
                <input placeholder='example@domain.com' id="loginEmail"/>
                <br/>
                <label>Password</label>
                <input type='password' placeholder='Password' id="loginPassword"/>
                <br/>
                <button onClick={this.login}>Login</button>
                <button onClick={this.signUp}>Sign Up</button>
            </div>);

    }
}
