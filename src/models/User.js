export class User{
    constructor(id = -1,email = -1,firstName = -1,lastName = -1,puzzles = []){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.puzzles = puzzles;
    }
    revive(json){
        let obj = JSON.parse(json);
        this.id = obj.id;
        this.email = obj.email;
        this.firstName = obj.firstName;
        this.lastName = obj.last;
        this.puzzles = obj.puzzles;
    }
}