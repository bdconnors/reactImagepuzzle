import {Puzzle} from "./Puzzle";

export class User{
    constructor(id = -1,email = -1,firstName = -1,lastName = -1,puzzles = []){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.puzzles = puzzles;
    }
    getPuzzle=(id)=>{
        return this.puzzles.find((puzzle)=>{return puzzle.id === id});
    };
    addPuzzle=(puzzle)=>{
        this.puzzles.push(puzzle);
    };
}