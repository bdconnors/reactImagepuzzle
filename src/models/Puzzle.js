export class Puzzle {
    constructor(id,name,width,height,src,grid,pieces) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
        this.grid = grid;
        this.pieces = pieces;
        this.src = src;
    }

    select = (x, y) => {
        return this.grid.select(x, y);
    };
    place = (id,x, y) => {
        this.grid.place(id, x, y);
        this.grid.update();
    };
    shuffle = () => {
        this.pieces.shuffle();
        this.grid.setPieces(this.pieces);
        this.grid.update();
    };
    reset = () => {
        this.pieces.reset();
        this.grid.setPieces(this.pieces);
        this.grid.update();
    };
    load = (columns, rows) => {
        this.grid.generate(this.width,this.height, columns, rows);
        this.pieces.generate(this.width,this.height,columns, rows);
        for (let i = 0; i < this.grid.size(); i++) {
            let position = this.grid.getById(i);
            let piece = this.pieces.get(i);
            position.setPiece(piece);
        }
        this.grid.update();
    };
    isSolved = () => {
        return this.grid.incorrect === 0;
    };
}

