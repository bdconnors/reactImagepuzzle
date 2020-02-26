import * as React from "react";
import {appStore} from "../../store/store";

export class Status extends React.Component{

    constructor(props){
        super(props);
        this.state = this.props.state;
    }
    render(){
        if(this.state.loggedIn === 'true' && this.state.puzzle !== -1) {
            let color = '#ff0000';
            let text = 'Incomplete';
            if (this.state.puzzle.isSolved()) {
                color = '#00ff00';
                text = 'Solved!';
            }
            return <div>
                <h1>Puzzle {this.state.puzzle.name}</h1>
                <h3>Status:<span style={{color: color}}> {text}</span></h3>
                <h3>Correct: {this.state.puzzle.grid.correct}</h3>
                <h3>Incorrect: {this.state.puzzle.grid.incorrect}</h3>
            </div>
        }
        return <h2></h2>;

    }

}