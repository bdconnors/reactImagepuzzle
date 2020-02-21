import React from "react";
import {RailsAPI} from "./RailsAPI";
import {REGEX} from "../constants/constants";
const api = new RailsAPI();
export class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            nameErr:"",
            email: "",
            emailConfirm:"",
            emailErr: "",
            password: "",
            passwordConfirm:"",
            passErr:""

        };
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    register=event=>{
        this.clearErrors();
        let validEmail = this.validateEmail();
        let validPass = this.validatePassword();
        let validName = this.validateName();
        if(validEmail && validPass && validName){
            api.register(this.state.firstName,this.state.lastName,this.state.email,this.state.password).then((user)=>{
                localStorage.setItem('user',user);
                this.props.history.push('/');
            }).catch((e)=>{
                console.log(e)
            });
        }
    };
    validateName = ()=>{
        let valid = false;
        let firstNameHasValue = this.state.firstName !=='';
        let lastNameHasValue = this.state.lastName !== '';
        if(firstNameHasValue && lastNameHasValue){
            valid = true;

        }else{
            this.showError('nameErr','Please enter your name');
        }
        return valid;
    };
    validatePassword=()=>{
        let valid = true;
        let pass = this.state.password.toLowerCase();
        let confirm = this.state.passwordConfirm.toLowerCase();
        let match = pass === confirm;
        let haveValue = pass !== '' && confirm !== '';
        if(!haveValue) {
            valid = false;
            this.showError('passErr','Please enter a password');
        }else{
            if (!match) {
                valid = false;
                this.showError('passErr', 'Passwords do not match');
            }
        }
        return valid;
    };
    validateEmail =()=>{
        let valid = false;
        let validEmail = this.validEmailFormat(this.state.email);
        let validConfirm = this.validEmailFormat(this.state.emailConfirm);
        let match = this.state.email.toLowerCase() === this.state.emailConfirm.toLowerCase();
        if(validEmail && validConfirm){
            if(match){
                valid = true;
            }else{
                this.showError('emailErr','E-mails do not match');
            }
        }else{
            this.showError('emailErr','Invalid e-mail format');
        }
        return valid;
    };
    validEmailFormat=(value)=>{
        let regex = new RegExp(REGEX.email);
        return regex.test(value);
    };
    clearErrors=()=>{
        this.setState({
            emailErr:'',
            passErr:'',
            nameErr:''
        });
    };
    showError = (id,text)=>{
      this.setState({[id]:text});
    };
    render() {
        return (<div>
            <h1>Image Puzzle Login</h1>
            <span style={{color:'red'}}><pre>{this.state.nameErr}</pre></span>
            <label>First Name</label>
            <input
                id='firstName'
                name='firstName'
                value={this.state.firstName}
                onChange={this.handleChange}
            />
            <br/>
            <label>Last Name</label>
            <input
                id='lastName'
                name='lastName'
                value={this.state.lastName}
                onChange={this.handleChange}
            />
            <br/>
            <span style={{color:'red'}}><pre>{this.state.emailErr}</pre></span>
            <label>E-Mail</label>
            <input
                id='email'
                name='email'
                placeholder='example@domain.com'
                value={this.state.email}
                onChange={this.handleChange}
            />
            <br/>
            <label>Confirm E-Mail</label>
            <input
                id="emailConfirm"
                name='emailConfirm'
                placeholder='example@domain.com'
                value={this.state.emailConfirm}
                onChange={this.handleChange}
            />
            <br/>
            <span style={{color:'red'}}><pre>{this.state.passErr}</pre></span>
            <label>Password</label>
            <input
                id="password"
                type='password'
                name='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleChange}
            />
            <br/>
            <label>Confirm Password</label>
            <input
                id="passwordConfirm"
                type='password'
                name='passwordConfirm'
                placeholder='Password'
                value={this.state.passwordConfirm}
                onChange={this.handleChange}
            />
            <br/>
            <button  onClick={this.register}>Register</button>
        </div>)
    }
}
