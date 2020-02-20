import {display_states,puzzle_config,puzzle_actions,puzzle_state} from '../constants/constants';
import {createStore} from "redux";
import uuid from 'react-uuid'


//puzzle states
const solved = puzzle_state.solved;
const in_progress = puzzle_state.in_progress;
const moving_piece = puzzle_state.moving_piece;
const piece_moved = puzzle_state.piece_moved;
const new_puzzle = puzzle_state.new_puzzle;
const generating_board = puzzle_state.generating_board;

//puzzle actions
const reset = puzzle_actions.reset;
const shuffle = puzzle_actions.shuffle;
const generate = puzzle_actions.generate;
const select_piece = puzzle_actions.select_piece;
const select_target = puzzle_actions.select_target;
const update_board = puzzle_actions.update_board;
const puzzle_id = uuid();

const initialState = {
    id:puzzle_id,
    state:generating_board,
    col:puzzle_config.col,
    row:puzzle_config.row,
    img: '',
    width: 0,
    height: 0,
    positions:[],
    pieces:[],
    selected_piece: 0,
    selected_target: 0,
    correct_pieces: 0,
    incorrect_pieces:0
};

export const reducer = (state = initialState, action)=>{
    console.log(state);
    if (typeof state !== 'undefined') {
            switch(action.type){
                case 'display':
                    state.display = action.payload;
                    break;
                case generate:
                    state.img = action.payload.img;
                    state.width  = action.payload.width;
                    state.height = action.payload.height;
                    state.state = new_puzzle;
                    console.log(state);
                    break;
                case shuffle:
                    state.positions = action.payload.positions;
                    state.pieces = action.payload.pieces;
                    state.correct_pieces = action.payload.correct_pieces;
                    state.incorrect_pieces = action.payload.incorrect_pieces;
                    state.selected_piece = 0;
                    state.selected_target = 0;
                    state.state = in_progress;
                    console.log(state);
                    break;
                case reset:
                    state.positions = action.payload.positions;
                    state.pieces = action.payload.pieces;
                    state.correct_pieces = 16;
                    state.incorrect_pieces = 0;
                    state.selected_piece = 0;
                    state.selected_target = 0;
                    state.state = new_puzzle;
                    console.log(state);
                    break;
                case select_piece:
                    state.selected_piece = action.payload.selected_piece;
                    state.state = moving_piece;
                    console.log(state);
                    break;
                case select_target:
                    state.selected_target = action.payload.selected_target;
                    state.state = piece_moved;
                    break;
                case update_board:
                    state.positions = action.payload.positions;
                    state.pieces = action.payload.pieces;
                    state.selected_piece = action.payload.selected_piece;
                    state.selected_target = action.payload.selected_target;
                    state.correct_pieces = action.payload.correct_pieces;
                    state.incorrect_pieces = action.payload.incorrect_pieces;
                    if(state.incorrect_pieces === 0){
                        state.state = solved;
                    }else {
                        state.state = in_progress;
                    }
                    console.log(state);
                    break;
                default:
                    return state;
            }

    }
    return state
};

export const store = createStore(reducer);
