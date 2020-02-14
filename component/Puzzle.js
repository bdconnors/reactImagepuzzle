import React from 'react';
import {store} from "../reducers/reducer";
import {PuzzleBoard} from "../models/PuzzleBoard";
import {display_states, puzzle_config, puzzle_state} from "../constants/constants";
import {shuffleBoard, updateBoard,resetBoard} from '../actions/actions';
const board = new PuzzleBoard();
export class Puzzle extends React.Component {
    constructor(props) {
        super(props);
        this.id = display_states.puzzle_canvas;
        this.state = this.getCurrentStateFromStore();
        this.shuffle = this.shuffle.bind(this);
        this.reset = this.reset.bind(this);
    }

    getCurrentStateFromStore() {
        const state = store.getState();
        this.state = state.puzzle;
        return this.state;
    }

    updateStateFromStore = () => {
        const state = this.getCurrentStateFromStore();
        const currentState = state.puzzle;
        if (this.state !== currentState) {
            this.setState(currentState);
        }
    };

    componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
        const dispatch = store.dispatch;
        board.id = this.id;
        board.col = this.state.col;
        board.row = this.state.row;
        this.getImage(this.state.img,this.state.width,this.state.height).then((image)=>{
            board.image = image;
            board.createBoard();
            board.createPieces();
            board.displaySolution();
            dispatch(resetBoard(board.positions,board.pieces));
        }).catch((e)=>{console.log(e)})
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }
    shuffle=()=>{
        const dispatch = store.dispatch;
        board.shuffleBoard();
        dispatch(shuffleBoard(board.positions,board.pieces,board.selected_piece,board.selected_target));

    };
    reset=()=>{
        const dispatch = store.dispatch;
        board.displaySolution();
        dispatch(resetBoard(board.positions,board.pieces));
    };
    getImage(src,width,height){
        return new Promise((resolve,reject)=> {
            let image = new Image(width,height);
            image.src = src;
            image.onload=()=>{
                resolve(image);
            }
        });
    }
    render() {
        return (
            <div>
                <canvas id={this.id} width={this.state.width} height={this.state.height}></canvas>
                <br/>
                <br/>
                <button onClick={this.shuffle}>Shuffle</button>
                <button onClick={this.reset}>Reset</button>
            </div>
        )

    }


}
