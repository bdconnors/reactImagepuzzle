import {state_props,display_states,} from "../constants/constants";

export const setDisplay=(id)=>{
    return {type:'display',payload:id};
};
export const setPuzzleBoard=(src,width,height)=>{
    return {type:'generate',payload:{img:src,width:width,height:height}};
};
export const updateBoard=(positions,pieces,sel_piece,sel_trgt,correct,incorrect)=> {
    return {
        type:'update_board',
        payload:{
            positions: positions,
            pieces: pieces,
            select_piece: sel_piece,
            select_target: sel_trgt,
            correct_pieces: correct,
            incorrect_pieces: incorrect
        }
    };
};
export const shuffleBoard=(positions,pieces,correct,incorrect)=>{
    return {
        type:'shuffle',
        payload:{
            positions:positions,
            pieces:pieces,
            correct_pieces: correct,
            incorrect_pieces: incorrect
        }

    }
};
export const selectPiece=(piece)=>{
    return{type:'select_piece',payload:{selected_piece:piece}};
};
export const selectTarget=(target)=>{
    return{type:'select_target',payload:{selected_target:target}};
};
export const resetBoard=(positions,pieces)=>{
    return {
        type:'reset',
        payload:{
            positions:positions,
            pieces:pieces
        }

    }
};