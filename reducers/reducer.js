import {display_states,puzzle_config,puzzle_actions,puzzle_state} from '../constants/constants';
import {createStore} from "redux";

//display states
const upload_form = display_states.upload_form;
const puzzle_canvas = display_states.puzzle_canvas;

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

const initialState = {
    display:upload_form,
    puzzle:{
        state:generating_board,
        col:puzzle_config.col,
        row:puzzle_config.row,
        img: '',
        width: 0,
        height: 0,
        positions:[],
        pieces:[],
        selected_piece: '',
        selected_target: '',
        correct_pieces: 0,
        incorrect_pieces:puzzle_config.positions
    }
};

export const reducer = (state = initialState, action)=>{
    console.log(state);
    if (typeof state !== 'undefined') {
            switch(action.type){
                case 'display':
                    state.display = action.payload;
                    break;
                case generate:
                    state.puzzle.img = action.payload.img;
                    state.puzzle.width  = action.payload.width;
                    state.puzzle.height = action.payload.height;
                    state.puzzle.state = new_puzzle;
                    console.log(state);
                    break;
                case shuffle:
                    state.puzzle.positions = action.payload.positions;
                    state.puzzle.pieces = action.payload.pieces;
                    state.puzzle.correct_pieces = 0;
                    state.puzzle.selected_piece = '';
                    state.puzzle.selected_target = '';
                    state.puzzle.state = in_progress;
                    console.log(state);
                    break;
                case reset:
                    state.puzzle.positions = action.payload.positions;
                    state.puzzle.pieces = action.payload.pieces;
                    state.puzzle.incorrect_pieces = puzzle_config.positions;
                    state.puzzle.correct_pieces = 0;
                    state.puzzle.selected_piece = '';
                    state.puzzle.selected_target = '';
                    state.puzzle.state = new_puzzle;
                    console.log(state);
                    break;
                case select_piece:
                    state.puzzle.selected_piece = action.payload;
                    state.puzzle.state = moving_piece;
                    break;
                case select_target:
                    state.puzzle.target = action.payload;
                    state.puzzle.state = piece_moved;
                    break;
                case update_board:
                    state.puzzle.positions = action.payload.positions;
                    state.puzzle.pieces = action.payload.pieces;
                    state.puzzle.selected_piece = action.payload.selected_piece;
                    state.puzzle.selected_target = action.payload.selected_target;
                    state.puzzle.correct_pieces = action.payload.correct_pieces;
                    state.puzzle.incorrect_pieces = action.payload.incorrect_pieces;
                    break;
                default:
                    return state;
            }

    }
    return state
};

export const store = createStore(reducer);
