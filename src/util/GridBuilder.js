import {Section} from "../models/Section";
import {Position} from "../models/Position";
import {Grid} from "../models/Grid";

export class GridBuilder{
    constructor(){
    }
    make=(positions = [],incorrect = 0,correct = 0,posWidth = 0,posHeight = 0)=>{
        return new Grid(positions,incorrect,correct,posWidth,posHeight);
    };
    revive=(obj)=>{
        let positions = [];
        for(let i = 0; i < obj.positions.length; i++){
            let raw = obj.positions[i];
            let section = new Section(raw.piece.id,raw.piece.imgX,raw.piece.imgY);
            let pos = new Position(raw.id,raw.x,raw.y,raw.top,raw.bottom,raw.left,raw.right,section);
            positions.push(pos);
        }
        return this.make(positions,obj.incorrect,obj.correct);
    }

}