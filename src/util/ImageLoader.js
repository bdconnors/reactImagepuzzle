import {User} from "../models/User";
import {PuzzleImage} from "../models/PuzzleImage";

export class ImageLoader{
    constructor(){}

    multiplePuzzles=(puzzles)=>{
        console.log(puzzles);
        let images = [];
        return new Promise((resolve,reject)=>{

            for(let i = 0; i < puzzles.length; i++){
                const puzzle = puzzles[i];
                console.log(puzzle);
                let image = new Image();
                image.src = puzzle.src;
                images.push(new PuzzleImage(puzzles[i].id,image));
            }
            console.log(images);
            resolve(images);
        });
    };
    multipleFile=(files)=>{
        return new Promise((resolve,reject)=>{
            let images = [];
            for(let i = 0; i < files.length; i++){
                this.fromFile(files[i]).then((image)=>{
                    images.push(image);
                });
            }
            resolve(images);
        });
    };
    multipleURL=(urls)=>{
        return new Promise((resolve,reject)=>{
            let images = [];
            for(let i = 0; i < urls.length; i++){
                this.fromURL(urls[i]).then((image)=>{
                    images.push(image);
                });
            }
            resolve(images);
        });
    };
    fromFile=(file)=>{
        return new Promise((resolve,reject)=> {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let image = new Image();
                image.src = reader.result;
                image.onload=()=>{
                    resolve(image);
                }
            };
        });
    };
    fromURL=(url)=>{
        return new Promise((resolve,reject)=>{
            let image = new Image();
            image.src = src;
            image.onload=()=>{
                resolve(image);
            };
        });
    };
    fromPuzzle=(puzzle)=>{
        return new Promise((resolve,reject)=>{
            this.fromURL(puzzle.src).then((image)=>{
                resolve(new PuzzleImage(puzzle.id,image));
            });
        });
    };
    reviveImages=(puzzles)=>{
        return new Promise((resolve,reject)=>{
            let puzzleImages = [];
            for(let i = 0; i < puzzles.length; i++){
                let puzzle = puzzles[i];
                this.getImage(puzzle.src).then((image)=>{
                    let puzzleImage = new PuzzleImage(puzzle.id,image);
                    puzzleImages.push(puzzleImage);
                });
            }
            resolve(puzzleImages);
        });
    };
    getImage=(src)=>{
        return new Promise((resolve,reject)=>{
            let image = new Image();
            image.src = src;
            image.onload=()=>{
                resolve(image);
            };
        });
    };

}