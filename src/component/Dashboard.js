import * as React from "react";
import {appStore} from "../store/store";
import {SessionManager} from "../util/SessionManager";
import {selectPuzzle} from "../actions/actions";
const sessionManager = new SessionManager();

export class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.update();

    }

    update() {
        this.state = appStore.getState();
    }
    componentDidMount() {
        this.setState(this.state);
        console.log(this.state);
    }
    render() {
        if (this.state.loggedIn()) {
            return <div>
                <button onClick={() => {
                    this.props.history.push('/upload')
                }}>New Puzzle
                </button>
                <br/>
                <br/>
                <ul>{
                    this.state.user.puzzles.map((puzzle, i) => {
                        let image = this.state.images.find((image) => {
                            return image.puzzleId === puzzle.id;
                        });
                        console.log(image);
                        console.log(puzzle);
                        let width = image.image.width * .5;
                        let height = image.image.height * .5;
                        let src = image.image.src;
                        return <li key={puzzle.id}>
                            <a onClick={()=>{
                                const dispatch = appStore.dispatch;
                                dispatch(selectPuzzle(puzzle.id));
                                this.props.history.push('/puzzle/'+puzzle.id);
                            }}>
                                <img src={src} width={width} height={height}/>
                                <br/>
                                {puzzle.name}
                            </a>
                            <br/>
                        </li>
                    })
                }
                </ul>
                );
            </div>
        }else{
            this.props.history.push('/login');
            return <div></div>;
        }
    }

}
export const PuzzleList=(props)=>{
    console.log(props);
    if(props.user && props.images) {
        return(<ul>{
            props.user.puzzles.map((puzzle, i) => {
                let image = props.images.find((image) => {
                    return image.puzzleId === puzzle.id;
                });
                console.log(image);
                console.log(puzzle);
                let width = image.image.width * .5;
                let height = image.image.height * .5;
                let src = image.image.src;
                return <li key={puzzle.id}>
                    <a>
                        <img src={src} width={width} height={height}/>
                        <br/>
                        {puzzle.name}
                    </a>
                    <br/>
                </li>
            })
        }
        </ul>);
    }else{
        return <ul></ul>;
    }
};