import React from 'react';
import {newPuzzle} from "../actions/actions";
import {appStore} from "../store/store";
import {Api} from "../util/Api";
import {ImageLoader} from "../util/ImageLoader";
import {PuzzleBuilder} from "../util/PuzzleBuilder";
import {PuzzleImage} from "../models/PuzzleImage";
import {_CONFIG} from "../constants/constants";
import {SessionManager} from "../util/SessionManager";

export class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.update();
        this.uploadImg = this.uploadImg.bind(this);
    }
    update=()=> {
        this.state = appStore.getState();
        return this.state;
    };
    render() {
        const sessionManager = new SessionManager();
        sessionManager.start();
        if(!this.state.loggedIn()) {
            this.props.history.push('/login');
            return(<div></div>)
        }else{
            return (<div>
                <h1>Create Puzzle</h1>
                <label>Puzzle Name:</label>
                <br/>
                <input type="text" name="puzzle_name" id="puzzle_name"/>
                <br/>
                <br/>
                <input type="file" id="file_input"/>
                <br/>
                <br/>
                <button onClick={this.uploadImg}> Upload Image</button>
            </div>);
        }

    }
    uploadImg=(e)=>{
        const dispatch = appStore.dispatch;
        const api = new Api();
        const imageLoader = new ImageLoader();
        const puzzleBuilder = new PuzzleBuilder();
        let name  = document.getElementById('puzzle_name').value;
        let input = document.getElementById('file_input');
        imageLoader.fromFile(input.files[0]).then((image)=>{
            let puzzle = puzzleBuilder.make();
            puzzle.name = name;
            puzzle.width = image.width;
            puzzle.height = image.height;
            puzzle.src = image.src;
            puzzle.load(_CONFIG.COL,_CONFIG.ROW);
            dispatch(newPuzzle(puzzle,new PuzzleImage(puzzle.id,image)));
            this.update();
            api.updatePuzzles(this.state.user.id,this.state.user.puzzles).catch((e)=>{console.log(e)});
            this.props.history.push('/');
        }).catch((e)=>{console.log(e)});
    };

}



