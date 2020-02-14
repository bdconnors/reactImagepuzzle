import {ImageUpload} from './ImageUpload';
import {Puzzle} from "./Puzzle";
import {display_states} from "../constants/constants";
import React, { Component } from 'react';
import {store} from '../reducers/reducer';

export class App extends Component {
    constructor(props){
        super(props);
        this.state = this.getCurrentStateFromStore();
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
                <Puzzle/>
            </div>
        }
    }

}