import {ImageUpload} from './ImageUpload';
import {Puzzle} from "./Puzzle";
import {display_states} from "../constants/constants";
import React, { Component } from 'react';
import {store} from '../reducers/reducer';

export class App extends Component {
    constructor(props){
        super(props);
        this.state = this.getCurrentStateFromStore();
        this.gameStatus = {status:'incomplete',txtColor:{color:'#ff0000'}};
    }

    getCurrentStateFromStore() {
        console.log(this.props);
        return {
            display: store.getState().display,
            puzzle: store.getState().puzzle
        }
    }

    updateStateFromStore = () => {
        const currentState = this.getCurrentStateFromStore();

        if (this.state !== currentState) {
            this.setState(currentState);
            if(currentState.puzzle.state === 'solved' || currentState.puzzle.state === 'new_puzzle'){
                this.gameStatus.status = 'Solved';
                this.gameStatus.txtColor = {color:'#00ff00'};
            }else{
                this.gameStatus.status = 'In progress';
                this.gameStatus.txtColor = {color:'#ff0000'};
            }

        }
    };

    componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);

    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    render() {
        const { display } = this.state;

        if(display === display_states.upload_form) {
            return <div>
                <h1>Image Puzzle</h1>
                <ImageUpload/>
            </div>
        }else if(display === display_states.puzzle_canvas){
            return <div>
                <h1>Image Puzzle</h1>
                <h2>Status: <span style={this.gameStatus.txtColor}>{this.gameStatus.status}</span></h2>
                <Puzzle/>
            </div>
        }
    }

}