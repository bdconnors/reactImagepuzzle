import React from 'react';
import {elements,types} from "../constants/constants";
import {setPuzzleBoard} from "../actions/actions";
import {store} from "../reducers/reducer";
import { useHistory } from "react-router-dom";


export class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.uploadImg = this.uploadImg.bind(this);
    }

    render() {
        return (<div>
                <h1>Image Puzzle Upload</h1>
                <input type={types.file} id={elements.file_input}/>
                <br/>
                <br/>

                <button onClick={this.uploadImg}> Upload Image</button>
        </div>);
    }

    uploadImg=(e)=>{

        const dispatch = store.dispatch;
        let input = document.getElementById(elements.file_input);
        this.getImage(input.files[0]).then((image)=>{
            dispatch(setPuzzleBoard(image.src,image.width,image.height));
            this.props.history.push('/puzzle');
        }).catch((e)=>{console.log(e)});

    };
    getImage(file){
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



