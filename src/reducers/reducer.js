import {_ACTION, _CONFIG} from '../constants/constants';
import {createStore} from "redux";
import uuid from 'react-uuid'
import {Puzzle} from "../models/Puzzle";
import {User} from "../models/User";
const puzzle_id = uuid();
const initialState = {
    user: new User(),
    puzzle:  new Puzzle(puzzle_id)
};
let loggedIn = localStorage.getItem('user');
let lastPuzzle = localStorage.getItem('puzzle');
if(loggedIn){
    initialState.user.revive(loggedIn);
}
if(lastPuzzle){
    initialState.puzzle.revive(lastPuzzle);
}
export const reducer = (state = initialState, action)=>{
    console.log(state);
    if (typeof state !== 'undefined') {
            switch(action.type){
                case _ACTION.GENERATE:
                    state.puzzle = new Puzzle(puzzle_id);
                    state.puzzle.img = action.payload.image;
                    state.puzzle.load(_CONFIG.COL,_CONFIG.ROW);
                    save();
                    break;
                case  _ACTION.SHUFFLE:
                    state.puzzle.shuffle();
                    save();
                    break;
                case  _ACTION.RESET:
                    state.puzzle.reset();
                    save();
                    break;
                case  _ACTION.SELECT:
                    state.puzzle.select(action.payload.x,action.payload.y);
                    save();
                    break;
                case  _ACTION.PLACE:
                    state.puzzle.place(action.payload.x,action.payload.y);
                    save();
                    break;
                default:
                    return state;
            }

    }
    return state
};
function save(){
    let state = initialState;
    let saved = JSON.parse(JSON.stringify(state.puzzle));
    saved.img = {src:state.puzzle.img.src,w:state.puzzle.img.width,h:state.puzzle.img.height};
    localStorage.setItem('puzzle',JSON.stringify(saved));
}
export const store = createStore(reducer);
