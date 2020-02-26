import * as React from "react";
import {ImageLoader} from "../../util/ImageLoader";
import {PuzzleBuilder} from "../../util/PuzzleBuilder";
import {_CONFIG} from "../../constants/constants";
import {PuzzleImage} from "../../models/PuzzleImage";
import {api} from "../App";

export class CreateButton extends React.Component{
    constructor(props){
        super(props);
        this.create.bind(this);
    }

    render(){
        return <button onClick={()=>{this.create(this.props.upload)}}>Create</button>
    }
    create=(callBack)=>{
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

            let puzzleImage = new PuzzleImage(puzzle.id,image);
            this.props.user.puzzles.push(puzzle);

            api.updatePuzzles(this.props.user.id,this.props.user.puzzles).then(()=> {
                callBack({puzzle: puzzle, puzzleImage: puzzleImage});
            });

        }).catch((e)=>{console.log(e)});
    }
}