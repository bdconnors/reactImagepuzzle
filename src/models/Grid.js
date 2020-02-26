import {Position} from "./Position";

export class Grid{
    constructor(positions,incorrect,correct){
        this.positions = positions;
        this.correct = correct;
        this.incorrect = incorrect;
    }
    select=(x,y)=>{
        return  this.get(x,y);
    };
    place=(id,x,y)=>{
        let target = this.get(x,y);
        let selected = this.getByPieceId(id);
        let piece = selected.piece;
        selected.setPiece(target.getPiece());
        target.setPiece(piece);
        return target;
    };
    get=(x,y)=>{
        console.log(x,y);
        for(let i = 0; i < this.positions.length; i++){
            if(this.positions[i].inRange(x,y)){
                return this.positions[i];
            }
        }
    };
    getById=(id)=>{
        return this.positions.find((pos)=>{
            return pos.id === id;
        });
    };
    getByPieceId=(id)=>{
        return this.positions.find((pos)=>{
            return pos.piece.id === id;
        });
    };
    set=(id,piece)=>{
        let position = this.getById(id);
        console.log(id);
        console.log(position);
        position.setPiece(piece)
    };
    setPieces=(pieces)=>{
        for(let i = 0; i < pieces.count(); i++){
            this.set(i,pieces.sections[i]);
        }
    };
    generate=(imgW,imgH,columns,rows)=>{
        const posWidth = imgW/columns;
        const posHeight = imgH/rows;
        let id = 0;
        for(let i = 0; i < columns; i++){
            let y = posHeight * i;
            for(let j = 0; j < rows; j++){
                let x = posWidth * j;
                let top = y;
                let bottom = top + posHeight;
                let left = x;
                let right = left + posWidth;
                this.positions.push(this.make(id,x,y,top,bottom,left,right));
                id++;
            }
        }
    };
    make=(id,x,y,top,bottom,left,right)=>{
        return new Position(id,x,y,top,bottom,left,right);
    };
    size=()=>{
        return this.positions.length;
    };
    update=()=>{
        let correct = 0;
        let incorrect = 0;
        for(let i = 0; i < this.positions.length; i++){
            let pos = this.positions[i];
            if(pos.isCorrect()){
                correct++;
            }else{
                incorrect++;
            }
        }
        this.correct = correct;
        this.incorrect = incorrect;
    };

}
