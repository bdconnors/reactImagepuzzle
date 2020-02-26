import React from 'react';
import {appStore} from "../../store/store";
import {ImageLoader} from "../../util/ImageLoader";
import {PuzzleBuilder} from "../../util/PuzzleBuilder";
import {_CONFIG} from "../../constants/constants";
import {sessionManager} from "../App";
import {api} from "../App";
import {PuzzleImage} from "../../models/PuzzleImage";
import {CreateButton} from "./CreateButton";

export class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = appStore.getState();
        this.upload.bind(this);
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
                }else{
                    this.props.history.push('/login');
                }
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
        return <div>
                <h1>Create Puzzle</h1>
            <label>Puzzle Name:</label>
            <br/>
            <input type="text" name="puzzle_name" id="puzzle_name"/>
            <br/>
            <br/>
            <input type="file" id="file_input"/>
            <br/>
            <br/>
            <CreateButton upload={this.upload} user={this.state.user}/>
        </div>;

    }
    upload=(result)=>{
        this.state.user.addPuzzle(result.puzzle);
        this.state.images.push(result.puzzleImage);
        this.setState({user:this.state.user,images:this.state.images});
        sessionManager.updateSession(this.state.user);
        this.props.history.push('/');
    };

}


