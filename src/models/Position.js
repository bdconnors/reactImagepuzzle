export class Position{
    constructor(id = 0,x = 0, y = 0,top = 0,bottom = 0,left = 0,right = 0,piece = null){
        this.id = id;
        this.x = x;
        this.y = y;
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this.piece = piece;
    }
    inRange(x,y){
        let vertical = y >= this.top && y <= this.bottom;
        let horizontal = x >= this.left && x <= this.right;
        return vertical && horizontal;
    }
    setBoundaries(top,bottom,left,right){
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
    setTop(top){
        this.top = top;
    }
    setBottom(bottom){
        this.bottom = bottom;
    }
    setLeft(left){
        this.left = left;
    }
    setRight(right){
        this.right = right;
    }
    setPiece(piece){
        this.piece = piece;
    }
    getPiece(){
        return this.piece;
    }
    isCorrect=()=>{
        return this.piece.id === this.id;
    };
    toString(){
        return JSON.stringify(this);
    }
}