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
    update_board:'update_board'
};
export const display_states = {
    upload_form:'upload_form',
    puzzle_canvas:'puzzle_canvas'
};
export const types = {
    file:'file'
};
export const elements ={
    file_input:'file_input'
};
