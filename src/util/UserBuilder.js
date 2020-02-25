import {User} from "../models/User";
import {Puzzle} from "../models/Puzzle";
import {PuzzleBuilder} from "./PuzzleBuilder";

export class UserBuilder{
    constructor(puzzleBuilder = new PuzzleBuilder()){
        this.puzzle = puzzleBuilder;
    }
    make=(id = null,firstName = null,lastName = null,email = null,puzzles = [])=>{
        return new User(id,firstName,lastName,email,puzzles);
    };
    revive(obj){
        let puzzles = [];
        if(obj.puzzles) {
            console.log(obj.puzzles);
            for (let i = 0; i < obj.puzzles.length; i++) {
                let puzzle = this.puzzle.revive(obj.puzzles[i]);
                console.log(puzzle);
                puzzles.push(puzzle);
            }
            return this.make(obj.id,obj.firstName, obj.lastName, obj.email, puzzles);
        }
    }

}