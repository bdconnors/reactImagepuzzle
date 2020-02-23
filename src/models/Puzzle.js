import {Board} from "./Board";
import {Pieces} from "./Pieces";

export class Puzzle{
    constructor(id = null,board = new Board,pieces = new Pieces(),img = null,selection = null){
        this.id = id;
        this.board = board;
        this.pieces = pieces;
        this.img = img;
        this.selection = selection;
    }
    select=(x,y)=>{
        this.selection = this.board.select(x,y);
    };
    place=(x,y)=>{
        this.board.place(this.selection,x,y);
        this.board.update();
        this.selection = null;
    };
    shuffle=()=>{
        this.pieces.shuffle();
        this.board.setPieces(this.pieces);
        this.board.update();
    };
    reset=()=>{
        this.pieces.reset();
        this.board.setPieces(this.pieces);
        this.board.update();
    };
    load=(columns,rows)=>{
        this.board.generate(this.img,columns,rows);
        this.pieces.generate(this.img,columns,rows);
        for(let i = 0; i < this.board.size(); i++){
            let position = this.board.getById(i);
            let piece = this.pieces.get(i);
            position.setPiece(piece);
        }
        this.board.update();
    };
    isSolved=()=>{
      return this.board.incorrect === 0;
    };
    positionWidth=()=>{
        return this.board.posWidth;
    };
    positionHeight=()=>{
        return this.board.posHeight;
    };
    revive(json){
        let obj = JSON.parse(json);
        let board = new Board();
        let pieces = new Pieces();
        board.revive(obj.board);
        pieces.revive(obj.pieces);
        this.id = obj.id;
        this.board = board;
        this.pieces = pieces;
        this.img = new Image(obj.img.width,obj.img.height);
        this.img.src = obj.img.src;
    }
}
