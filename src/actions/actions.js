export const login=(user,images)=>{
    return {type:0,payload:{user:user,images:images}};
};
export const update=(user)=>{
    return {type:1,payload:{user:user}};
};
export const newPuzzle=(puzzle,image)=>{
    return {type:2,payload:{puzzle:puzzle,image:image}};
};
export const addImages=(images)=>{
    return {type:3,payload:{images:images}}
};
export const selectPuzzle=(id)=>{
    return{type:4,payload:{id:id}};
};