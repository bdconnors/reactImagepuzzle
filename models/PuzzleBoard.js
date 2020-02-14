import {PuzzleBoardPosition} from "./PuzzleBoardPosition";
import {PuzzlePiece} from "./PuzzlePiece";
import {puzzle_config} from "../constants/constants";

export class PuzzleBoard{
    constructor(){
        this.id = null;
        this.image = null;
        this.col = 0;
        this.row = 0;
        this.positions = [];
        this.pieces = [];
        this.selected_piece ='';
        this.selected_target = '';
        this.correct_pieces = 0;
        this.incorrect_pieces = puzzle_config.positions;
    }

    createBoard=()=>{
        this.positions = [];
        let cellW = this.getPieceWidth();

        let cellH = this.getPieceHeight();
        console.log(cellW);
        console.log(cellH);
        let id = 0;
        for(let i = 0; i < this.col; i++){
            let y = cellH * i;
            for(let j = 0; j < this.row; j++){
                let x = cellW * j;
                let top = y;
                let bottom = top + cellH;
                let left = x;
                let right = left + cellW;
                let position = new PuzzleBoardPosition(id,x,y);
                position.setBoundaries(top,bottom,left,right);
                this.positions.push(position);
                id++;
            }
        }
    };
    shuffleBoard=()=>{
        this.randomizePieces();
        for(let i = 0; i < this.positions.length; i++){
            let piece = this.pieces[i];
            this.setByPosition(i,piece);
        }
        this.displayBoard();
    };
    createPieces=()=>{
        let id = 0;
        let width = this.getPieceWidth();
        let height = this.getPieceHeight();
        for(let i = 0; i < this.col; i++){
            let y = height * i;
            for(let j = 0; j < this.row; j++){
                let x = width * j;
                let piece = new PuzzlePiece(id,x,y);
                this.pieces.push(piece);
                id++;
            }
        }
    };
    randomizePieces=()=>{
        this.pieces.sort(() => Math.random() - 0.5);
    };
    displayBoard=()=>{
        this.display(false);
    };
    displaySolution=()=>{
        this.display(true);
    };
    display=(solution)=>{
        let ctx = this.getContext();
        ctx.canvas.width = this.image.width;
        ctx.canvas.height = this.image.height;
        for(let i = 0; i < this.positions.length; i++){
            let pos = this.positions[i];
            this.drawPiece(pos,solution);
        }
    };

    drawPiece=(pos,solution)=>{
        let width = this.getPieceWidth();
        let height = this.getPieceHeight();
        let ctx = this.getContext();
        let imgX;
        let imgY;
        if(solution){
            imgX = pos.x;
            imgY = pos.y;
        }else{
            imgX = pos.piece.imgX;
            imgY = pos.piece.imgY;
        }
        ctx.strokeStyle = puzzle_config.outline;
        ctx.drawImage(this.image, imgX, imgY, width, height, pos.x, pos.y, width, height);
        ctx.strokeRect(pos.x,pos.y,width,height);

    };
    getPieceCount=()=>{
        return this.pieces.length;
    };
    getPiece=(id)=>{
        return this.pieces.find((piece)=>{return piece.id === id});
    };
    setImage=(image)=>{
        this.image = image;
    };
    getImage=()=>{
        return this.image;
    };
    getPieceWidth=()=>{
        return this.image.width / this.col;
    };
    getPieceHeight=()=>{
        return this.image.height /  this.row;
    };
    getContext=()=>{
        return this.getElement().getContext(puzzle_config.ctx);
    };
    getElement=()=>{
        return document.getElementById(this.id);
    };

    setSelection=(x,y)=>{
        this.selected = this.getByRange(x,y);
        return this.selected;
    };
    setTarget=(x,y)=>{
        this.target = this.getByRange(x,y);
        return this.target;
    };
    move=()=>{
        this.swap(this.selected,this.target);
    };
    clearSelection=()=>{
        let selected = this.selected;
        this.selected = null;
        return selected;
    };
    clearTarget=()=>{
        let target = this.target;
        this.target = null;
        return target;
    };

    getByRange=(x,y)=>{
        let pos = this.positions.find((pos)=>{return pos.inRange(x,y) === true});
        return pos;
    };
    getByPosition=(id)=>{
        return this.positions.find((pos)=>{return pos.id === id});
    };
    getByPiece=(id)=>{
        return this.positions.find((pos)=>{return pos.piece.id === id});
    };
    getByCell=(col,row)=> {
        return this.positions.find((pos) => {
            return pos.col === col && pos.row === row;
        });
    };
    setByPosition=(id,piece)=>{
        let position = this.getByPosition(id);
        position.setPiece(piece)
    };
    swap=(selection,target)=>{
        let selectionPiece = selection.getPiece();
        let targetPiece = target.getPiece();
        selection.setPiece(targetPiece);
        target.setPiece(selectionPiece);
    };
}