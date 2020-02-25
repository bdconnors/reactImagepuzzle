import {Pieces} from "../models/Pieces";
import {Section} from "../models/Section";

export class PiecesBuilder{
    constructor(){}
    make=(sections = [])=>{
        return new Pieces(sections);
    };
    revive=(obj)=>{
        let sections = [];
        for(let i = 0; i < obj.sections.length; i++){
            let raw = obj.sections[i];
            let section = new Section(raw.id,raw.imgX,raw.imgY);
            sections.push(section);
        }
        return this.make(sections);
    };
}