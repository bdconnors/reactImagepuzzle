export const _CONFIG = {
    CTX:'2d',
    COL:4,
    ROW: 4,
    POS:16,
    OUTLINE:'#000'
};
export const _ELEMENT={
    CANVAS:'canvas'
};
export const _ACTION = {
    LOGIN:0,
    UPDATE:1,
    NEW_PUZZLE:2,
    ADD_IMAGES:3,
    SELECT_PUZZLE:4,
    SET_LOADING:5
};
export const API = {
    base:'http://localhost:3000/api/v1/',
    users:'users',
    login:'login'
};
export const REGEX = {
    email:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
};