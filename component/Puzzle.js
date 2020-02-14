import React from 'react';
import {store} from "../reducers/reducer";
import {PuzzleBoard} from "../models/PuzzleBoard";
import {display_states, puzzle_config, puzzle_state} from "../constants/constants";
import {shuffleBoard, updateBoard,resetBoard,selectPiece,selectTarget} from '../actions/actions';
const board = new PuzzleBoard();
export class Puzzle extends React.Component {
    constructor(props) {
        super(props);
        this.id = display_states.puzzle_canvas;
        this.state = this.getCurrentStateFromStore();
        this.shuffle = this.shuffle.bind(this);
        this.reset = this.reset.bind(this);
        this.clickBoard = this.clickBoard.bind(this);
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
            if(this.state.state === puzzle_state.piece_moved){
                const dispatch = store.dispatch;
                let check = board.check();
                board.selected_piece = 0;
                board.selected_target = 0;
                dispatch(updateBoard(board.positions,board.pieces,board.selected_piece,board.selected_target,check.correct,check.incorrect));
            }
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
        let check = board.check();
        console.log(check.correct,check.incorrect);
        dispatch(shuffleBoard(board.positions,board.pieces,check.correct,check.incorrect));

    };
    reset=()=>{
        const dispatch = store.dispatch;
        board.displaySolution();
        dispatch(resetBoard(board.positions,board.pieces));
    };
    clickBoard=(e)=>{
        if(this.state.state !== puzzle_state.new_puzzle) {
            const dispatch = store.dispatch;
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            if(this.state.state === puzzle_state.in_progress) {
                board.selected_piece = board.getByRange(x, y);
                dispatch(selectPiece(board.selected_piece.id));
            }else if(this.state.state === puzzle_state.moving_piece){
                board.selected_target = board.getByRange(x, y);
                board.move();
                dispatch(selectTarget(board.selected_target.id));
            }
        }
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
                <button onClick={this.shuffle}>Shuffle</button>
                <button onClick={this.reset}>Reset</button>
                <br/>
                <br/>
                <canvas onClick={this.clickBoard} id={this.id} width={this.state.width} height={this.state.height}></canvas>
            </div>
        )

    }


}
