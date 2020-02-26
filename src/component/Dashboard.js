import * as React from "react";
import {appStore} from "../store/store";
import {login, selectPuzzle, setLoading} from "../actions/actions";
import {sessionManager} from "./App";
import {dispatch} from "../store/store";
import {_CONFIG} from "../constants/constants";

export class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = appStore.getState();
        this.state.loading = 'initial';
    }

    update() {
        this.setState(appStore.getState());
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
                } else {
                    console.log(this.state);
                    this.props.history.push('/login');
                }

                console.log(result);
            });
        }
    }
    render() {
        console.log(this.state);
        if (this.state.loading === 'initial') {
            console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
            return <h2>Intializing...</h2>;
        } else if (this.state.loading === 'true') {
            console.log('This happens 5th - when waiting for data.');
            return <h2>Loading...</h2>;
        }
        if(this.state.loggedIn === 'true') {
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
                            <a onClick={() => {

                                this.props.history.push('/puzzle/' + puzzle.id);
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
            </div>
        }
        return <h2></h2>


    }

}