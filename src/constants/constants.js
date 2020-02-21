export const puzzle_config = {
    ctx:'2d',
    col:4,
    row: 4,
    positions:16,
    outline:'#000'
};
export const puzzle_state={
    solved:'solved',
    in_progress:'in_progress',
    new_puzzle:'new_puzzle',
    generating_board:'generating_board',
    moving_piece:'moving_piece',
    piece_moved:'piece_moved'
};
export const puzzle_actions = {
    generate:'generate',
    reset:'reset',
    shuffle:'shuffle',
    select_piece:'select_piece',
    select_target:'select_target',
    update_board:'update_board',
    solve_board:'solve_board'
};
export const display_states = {
    sign_up:'sign_up',
    upload_form:'upload_form',
    puzzle_canvas:'puzzle_canvas',
    puzzle_status:'puzzle_status'
};
export const types = {
    file:'file'
};
export const elements ={
    file_input:'file_input'
};
export const API = {
    base:'http://localhost:3000/api/v1/',
    login:'login',
    users:'users'
};
export const REGEX = {
    email:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
};