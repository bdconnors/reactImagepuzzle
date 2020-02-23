import React from 'react';
import {generate} from "../actions/actions";
import {store} from "../reducers/reducer";

export class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getCurrentStateFromStore();
        this.uploadImg = this.uploadImg.bind(this);
    }
    getCurrentStateFromStore() {
        this.state = store.getState();
        return this.state;
    }
    componentDidMount() {
        if(this.state.user.id === -1){
            this.props.history.push('/');
        }
    }

    updateStateFromStore = () => {
        const currentState = this.getCurrentStateFromStore();
        if (this.state !== currentState) {
            this.setState(currentState);
        }
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        return (<div>
            <h1>Image Puzzle Upload</h1>
            <input type="file" id="file_input"/>
            <br/>
            <br/>
            <button onClick={this.uploadImg}> Upload Image</button>
        </div>);

    }
    uploadImg=(e)=>{

        const dispatch = store.dispatch;
        let input = document.getElementById('file_input');
        this.getImage(input.files[0]).then((image)=>{
            dispatch(generate(image));
            this.props.history.push('/puzzle');
        }).catch((e)=>{console.log(e)});

    };
    getImage=(file)=>{
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
    }
}



