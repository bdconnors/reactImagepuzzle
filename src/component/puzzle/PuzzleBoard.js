import React from 'react';
import {appStore} from "../../store/store";
import {_CONFIG, _ELEMENT} from "../../constants/constants";
import * as ReactDOM from "react-dom";
import {api} from "../App";
import {sessionManager} from "../App";
import {useParams} from "react-router-dom";
import {Canvas} from "./Canvas";
import {Status} from "./Status";

export class PuzzleBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = appStore.getState();
    }
    componentDidMount() {
        if(this.state.loggedIn === 'false') {
            this.setState({loading:'true'});
            sessionManager.checkSession().then((result) => {
                this.setState({loading: 'false'});
                if (result !== false) {
                    this.setState({
                        user: result.user,
                        images: result.images,
                        loggedIn:'true'
                    });
                    const id = this.props.match.params.id;
                    const puzzle = this.state.user.puzzles.find((puzzle)=>{return puzzle.id === id});
                    const image = this.state.images.find((img)=>{return img.puzzleId === id});
                    this.setState({puzzle:puzzle,puzzleImage:image});

                }else{
                    this.props.history.push('/login');
                }
            });
        }else{
            const id = this.props.match.params.id;
            const puzzle = this.state.user.puzzles.find((puzzle)=>{return puzzle.id === id});
            const image = this.state.images.find((img)=>{return img.puzzleId === id});
            this.setState({puzzle:puzzle,puzzleImage:image});
        }
    }
    getStatus=()=>{
        let solved = this.state.puzzle.isSolved();
        let name = this.state.puzzle.name;
        let correct = this.state.puzzle.grid.correct;
        let incorrect = this.state.puzzle.grid.incorrect;
        let color = '#ff0000';
        let text = 'Incomplete';
        if(solved){
            color = '#00ff00';
            text = 'Solved!';
        }

        return {
            name:name,
            color:color,
            text:text,
            correct:correct,
            incorrect:incorrect
        }
    };
    render() {
        if (this.state.loading === 'initial') {
            console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
            return <h2>Intializing...</h2>;
        }
        if (this.state.loading === true) {
            console.log('This happens 5th - when waiting for data.');
            return <h2>Loading...</h2>;
        }
        if(this.state.loggedIn === 'true' && this.state.puzzle !== -1) {
            return (
                <div>
                    <Canvas state={this.state}/>
                </div>
            )
        }
        return <h2>Puzzle Not Found</h2>;

    }

}
