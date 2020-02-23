export const generate=(image)=>{
    return {type:'generate',payload:{image:image}};
};
export const shuffle=()=>{
    return {type:'shuffle', payload:''}
};
export const select=(x,y)=>{
    return{type:'select',payload:{x:x,y:y}};
};
export const place=(x,y)=>{
    return{type:'place',payload:{x:x,y:y}};
};
export const reset=()=>{
    return {type:'reset', payload:''}
};