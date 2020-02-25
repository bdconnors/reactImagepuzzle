import {GridBuilder} from "./GridBuilder";
import {PiecesBuilder} from "./PiecesBuilder";
import {Puzzle} from "../models/Puzzle";
import uuid from "react-uuid";
import {Grid} from "../models/Grid";
import {Pieces} from "../models/Pieces";

export class PuzzleBuilder{
    constructor(gridBuilder = new GridBuilder(), piecesBuilder = new PiecesBuilder()){
        this.grid= gridBuilder;
        this.pieces = piecesBuilder;
    }
    make=(id = uuid(),name="New Puzzle",width = 0,height = 0,src = null)=>{
        let grid = this.grid.make();
        let pieces = this.pieces.make();
        console.log(grid);
        console.log(pieces);
        return new Puzzle(id,name,width,height,src,this.grid.make(),this.pieces.make());
    };
    revive=(obj)=>{
        let puzzle = this.make(obj.id,obj.name,obj.width,obj.height,obj.src);
        console.log(puzzle);
        puzzle.grid = this.grid.revive(obj.grid);
        puzzle.pieces = this.pieces.revive(obj.pieces);
        return puzzle;
    };
}