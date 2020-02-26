export class AppReducer {
    constructor() {
        this.user = -1;
        this.images = [];
        this.puzzle = -1;
        this.puzzleImage = -1;
        this.loading = 'inital';
        this.loggedIn = 'false';
        this.selection = -1;
        this.err = "";
        this.statusText = 'Incomplete';
        this.statusColor = '#ff0000';
    }

    reducer = (state = this, action) => {
        return state;
    };

}
