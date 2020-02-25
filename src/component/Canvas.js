import React from 'react';
import {appStore} from "../store/store";
import {_CONFIG, _ELEMENT} from "../constants/constants";
import * as ReactDOM from "react-dom";
import {Api} from "../util/Api";
import {SessionManager} from "../util/SessionManager";

export class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.id = _ELEMENT.CANVAS;
        this.update();
    }
    update=()=>{
        this.state = appStore.getState();
    };
    componentDidMount() {
        const sessionManager = new SessionManager();
        sessionManager.start();
        if(this.state.loggedIn()) {
            this.draw();
        }else{
            this.props.history.push('/login');
        }
    }
    render(){
        const sessionManager = new SessionManager();
        sessionManager.start();
        if(!this.state.loggedIn()){
            this.props.history.push('/login');
            return(<div></div>);
        }else {
            return (
                <div>
                    <button>Shuffle</button>
                    <button>Reset</button>
                    <br/>
                    <br/>
                    <canvas id={this.id}></canvas>
                </div>
            );
        }
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
        const puzzle = this.state.puzzle;
        const image = this.state.puzzleImage.image;
        console.log(puzzle);
        let col = _CONFIG.COL;
        let row = _CONFIG.ROW;
        let ctx = this.getContext();
        ctx.canvas.width = puzzle.width;
        ctx.canvas.height = puzzle.height;
        ctx.strokeStyle = _CONFIG.OUTLINE;
        let w = puzzle.width/col;
        let h = puzzle.height/row;
        for(let i = 0; i < puzzle.grid.size(); i++){
            let pos = puzzle.grid.getById(i);
            ctx.drawImage(image, pos.piece.imgX, pos.piece.imgY, w, h, pos.x, pos.y, w, h);
            ctx.strokeRect(pos.x,pos.y,w,h);
        }
    };
    shuffle=()=>{
        this.state.puzzle.shuffle();
        this.draw();
        const api = new Api();
        api.updatePuzzles(this.state.user.id,this.state.user.puzzles).catch((e)=>{console.log(e)});
    };
    reset=()=>{
        this.state.puzzle.reset();
        this.draw();
        const api = new Api();
        api.updatePuzzles(this.state.user.id,this.state.user.puzzles).catch((e)=>{console.log(e)});
    };

    clickBoard=(e)=>{

        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        if(this.state.puzzle.hasSelection()){
            this.state.puzzle.place(x,y);
            this.draw();
            const api = new Api();
            api.updatePuzzles(this.state.user.id,this.state.user.puzzles).catch((e)=>{console.log(e)});
        }else {
            this.state.puzzle.select(x, y);
        }
    };
    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <button onClick={this.shuffle}>Shuffle</button>
                <button onClick={this.reset}>Reset</button>
                <br/>
                <br/>
                <canvas onClick={this.clickBoard} id={this.id}></canvas>
            </div>
        )

    }

}
