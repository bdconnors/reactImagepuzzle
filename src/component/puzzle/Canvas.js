import * as React from "react";
import {api, sessionManager} from "../App";
import * as ReactDOM from "react-dom";
import {_CONFIG, _ELEMENT} from "../../constants/constants";
import {Status} from "./Status";
import {appStore} from "../../store/store";


export class Canvas extends React.Component{

    constructor(props){
        super(props);
        this.state = this.props.state;
        this.click.bind(this);
        this.shuffle.bind(this);
        this.reset.bind(this);
        this.select.bind(this);
        this.place.bind(this);
        this.draw.bind(this);
        this.update.bind(this);
        this.getHeight.bind(this);
        this.getWidth.bind(this);
        this.getElement.bind(this);
        this.getContext.bind(this);
    }
    render(){
        return <div>
            <Status state={this.state}/>
            <canvas id={_ELEMENT.CANVAS}onClick={this.click}></canvas>
            <br/>
            <button onClick={this.shuffle}>Shuffle</button>
            <button onClick={this.reset}>Reset</button>
        </div>
    }

    getElement=()=>{
        const node = ReactDOM.findDOMNode(this);
        return node.querySelector('#'+_ELEMENT.CANVAS);
    };
    getContext=()=>{
        let canvas = this.getElement();
        return canvas.getContext(_CONFIG.CTX);
    };
    draw=()=>{
        console.log(this.state);
        const ctx = this.getContext();
        ctx.canvas.width = this.state.puzzle.width;
        ctx.canvas.height = this.state.puzzle.height;
        const image = this.state.puzzleImage.image;
        console.log(image);
        const w = this.getWidth();
        const h = this.getHeight();
        for(let i = 0; i < this.state.puzzle.grid.size(); i++){
            let pos = this.state.puzzle.grid.getById(i);
            ctx.drawImage(image, pos.piece.imgX, pos.piece.imgY, w, h, pos.x, pos.y, w, h);
            ctx.strokeRect(pos.x,pos.y,w,h);

        }
    };

    componentDidMount() {
        this.draw();
    }
    shuffle=()=>{
        console.log(this.state);
        this.state.puzzle.shuffle();
        this.update(this.state.user,this.state.puzzle);
    };
    reset=()=>{
        this.state.puzzle.reset();
        this.update(this.state.user,this.state.puzzle);
    };
    click=(e)=>{
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if(this.state.selection === -1){
            this.select(x,y);
        }else{
            this.place(x,y);
        }
    };
    place=(x,y)=>{
        let puzzle = this.state.puzzle;
        puzzle.place(this.state.selection,x,y);
        this.setState({selection:-1});
        this.update(this.state.user,this.state.puzzle);
    };
    select=(x,y)=>{
        let position = this.state.puzzle.select(x, y);
        let piece = position.piece;
        let id = piece.id;
        const ctx = this.getContext();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 5;
        ctx.strokeRect(position.x,position.y,this.getWidth(),this.getHeight());
        this.setState({selection:id});
    };
    update=(user,puzzle)=>{
        this.setState({user:user,puzzle:puzzle});
        sessionManager.updateSession(user);
        this.draw();
        api.updatePuzzles(this.state.user.id, this.state.user.puzzles);

    };
    getWidth=()=>{
        return this.state.puzzle.width/_CONFIG.COL;
    };
    getHeight=()=>{
        return this.state.puzzle.height/_CONFIG.ROW;
    };
    setDimensions=(ctx)=>{
        ctx.canvas.width = this.state.puzzle.width;
        ctx.canvas.height = this.state.puzzle.height;
    }

}