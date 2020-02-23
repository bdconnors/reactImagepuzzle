import React from 'react';
import {store} from "../reducers/reducer";
import {_CONFIG, _ELEMENT} from "../constants/constants";
import {place,reset,select,shuffle} from '../actions/actions';
import * as ReactDOM from "react-dom";

export class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.id = _ELEMENT.CANVAS;
        this.state = this.getCurrentStateFromStore();
        this.shuffle = this.shuffle.bind(this);
        this.reset = this.reset.bind(this);
        this.clickBoard = this.clickBoard.bind(this);
    }
    getCurrentStateFromStore() {
        this.state = store.getState();
        return this.state;
    }
    updateStateFromStore = () => {
        this.state = this.getCurrentStateFromStore();
        console.log(this.state);
    };
    componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
        console.log(this.state.user.id);
        if(this.state.user.id === -1) {
            this.props.history.push('/');
        }else if(this.state.puzzle.img === null){
            this.props.history.push('/upload');
        }else{
            console.log(this.state.puzzle);
            console.log(ReactDOM.findDOMNode(this));
            this.draw();
        }
    }
    componentWillUnmount() {
        this.unsubscribeStore();
    }
    getElement=()=>{
        const node = ReactDOM.findDOMNode(this);
        return node.querySelector('#'+this.id);
    };
    getContext=()=>{
        let canvas = this.getElement();
        return canvas.getContext(_CONFIG.CTX);
    };
    draw=()=>{
        let puzzle = this.state.puzzle;
        let ctx = this.getContext();
        ctx.canvas.width = puzzle.img.width;
        ctx.canvas.height = puzzle.img.height;
        ctx.strokeStyle = _CONFIG.OUTLINE;
        let w = puzzle.positionWidth();
        let h = puzzle.positionHeight();
        for(let i = 0; i < puzzle.board.size(); i++){
            let pos = puzzle.board.getById(i);
            ctx.drawImage(puzzle.img, pos.piece.imgX, pos.piece.imgY, w, h, pos.x, pos.y, w, h);
            ctx.strokeRect(pos.x,pos.y,w,h);
        }
    };
    shuffle=()=>{
        const dispatch = store.dispatch;
        dispatch(shuffle());
        this.draw();
    };
    reset=()=>{
        const dispatch = store.dispatch;
        dispatch(reset());
        this.draw();
    };
    clickBoard=(e)=>{
        if(this.state.puzzle !== this.state.puzzle.isSolved()) {
            const dispatch = store.dispatch;
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            console.log(x,y);
            if(!this.state.puzzle.selection){
                dispatch(select(x,y));
            }else{
                dispatch(place(x,y));
            }
            this.draw();
        }
    };
    render() {
        return (
            <div>
                <h1>Image Puzzle</h1>
                <button onClick={this.shuffle}>Shuffle</button>
                <button onClick={this.reset}>Reset</button>
                <br/>
                <br/>
                <canvas onClick={this.clickBoard} id={this.id}></canvas>
            </div>
        )

    }
}
