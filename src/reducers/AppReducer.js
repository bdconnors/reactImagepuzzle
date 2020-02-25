import {_ACTION} from '../constants/constants';
import {update} from "../actions/actions";
import {User} from "../models/User";
export class AppReducer {
    constructor(){
        this.user = -1;
        this.userPuzzles= [];
        this.images = [];
        this.puzzle = -1;
        this.puzzleImage = -1;
    }
    reducer = (state = this, action) => {
        switch(action.type){
            case _ACTION.LOGIN:
                this.setUser(action.payload.user);
                this.addImages(action.payload.images);
                break;
            case _ACTION.UPDATE:
                state.user = action.payload.user;
                break;
            case _ACTION.NEW_PUZZLE:
                this.newPuzzle(action.payload.puzzle,action.payload.image);
                break;
            case _ACTION.ADD_IMAGES:
                this.addImages(action.payload.images);
                break;
            case _ACTION.SELECT_PUZZLE:
                this.selectPuzzle(action.payload.id);
                break;
            default:
                break;
        }
        console.log(this);
        return state;
    };
    setUser=(user)=>{
        this.user = user;
        this.userPuzzles = user.puzzles;
    };
    loggedIn=()=>{
      return this.user.constructor.name === 'User';
    };
    newPuzzle=(puzzle,image)=>{
        this.images.push(image);
        this.user.puzzles.push(puzzle);
    };
    addImages=(images)=>{
        for(let i = 0; i < images.length; i++){
            this.images.push(images[i]);
        }
    };
    selectPuzzle=(id)=>{
        this.puzzle = this.user.puzzles.find((puzzle)=>{return puzzle.id === id});
        this.puzzleImage = this.images.find((img)=>{return img.puzzleId === id});

    }
}
