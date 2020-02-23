import {Position} from "./Position";
import {Section} from "./Section";

class Piece {
}

export class Board{
    constructor(positions = [],correct = -1,incorrect = -1){
        this.positions = positions;
        this.correct = correct;
        this.incorrect = incorrect;
        this.posWidth = -1;
        this.posHeight = -1;
    }
    select=(x,y)=>{
        let pos = this.get(x,y);
        return pos.getPiece();
    };
    place=(piece,x,y)=>{
        let target = this.get(x,y);
        let selected = this.getByPiece(piece.id);
        selected.setPiece(target.getPiece());
        target.setPiece(piece);
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
    getByPiece=(id)=>{
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
    generate=(image,columns,rows)=>{
        this.posWidth = image.width/columns;
        this.posHeight = image.height/rows;
        let id = 0;
        for(let i = 0; i < columns; i++){
            let y = this.posHeight * i;
            for(let j = 0; j < rows; j++){
                let x = this.posWidth * j;
                let top = y;
                let bottom = top + this.posHeight;
                let left = x;
                let right = left + this.posWidth;
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
        this.positions.forEach((pos)=>{
            if(pos.isCorrect()){
                correct++;
            }else{
                incorrect++;
            }
        });
        this.correct = correct;
        this.incorrect = incorrect;
    };
    revive(obj){
        console.log(obj);
        this.correct = obj.correct;
        this.incorrect = obj.incorrect;
        this.posWidth = obj.posWidth;
        this.posHeight = obj.posHeight;
        console.log(obj.positions);
        for(let i = 0; i < obj.positions.length; i++){
            console.log(obj.positions[i]);
            let raw = obj.positions[i];
            console.log(raw);
            let piece = new Section(raw.piece.id,raw.piece.imgX,raw.piece.imgY);
            let pos = new Position(raw.id,raw.x,raw.y,raw.top,raw.bottom,raw.left,raw.right,piece);
            this.positions.push(pos);
        }
    }

}
