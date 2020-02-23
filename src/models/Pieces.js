import {Section} from "./Section";

export class Pieces{
    constructor(sections = []){
        this.sections = sections;

    }
    shuffle=()=>{
        this.sections.sort(() => Math.random() - 0.5);
        return this.sections;
    };
    reset=()=>{
        this.sections.sort((a,b)=>{
            return a.id - b.id;
        });
        console.log(this.sections);
        return this.sections
    };
    get=(id)=>{
        return this.sections.find((piece)=>{
            return piece.id === id;
        });
    };
    generate=(image,columns,rows)=>{
        let width = image.width / columns;
        let height = image.height / rows;
        let id = 0;
        for(let i = 0; i < columns; i++){
            let y = height * i;
            for(let j = 0; j < rows; j++){
                let x = width * j;
                this.sections.push(this.make(id,x,y));
                id++;
            }
        }
    };
    make=(id,imgX,imgY,)=>{
        return new Section(id,imgX,imgY);
    };
    count=()=>{
        return this.sections.length;
    };
    revive(obj){
        for(let i = 0; i < obj.sections.length; i++){
            let raw = obj.sections[i];
            let section = new Section(raw.id,raw.imgX,raw.imgY);
            this.sections.push(section);
        }
    }
}