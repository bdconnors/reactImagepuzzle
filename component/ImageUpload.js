import React from 'react';
import {elements,types} from "../constants/constants";
import {setDisplay,setPuzzleBoard} from "../actions/actions";
import {store} from "../reducers/reducer";


export class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.uploadImg = this.uploadImg.bind(this);
    }

    render() {
        return (<div>
                <input type={types.file} id={elements.file_input}/>
                <br/>
                <br/>
                <button onClick={this.uploadImg}> Upload Image</button>
        </div>);
    }

    uploadImg=(e)=>{
        console.log(this);
        const dispatch = store.dispatch;
        let input = document.getElementById(elements.file_input);
        this.getImage(input.files[0]).then((image)=>{
            console.log(image.height);
            dispatch(setPuzzleBoard(image.src,image.width,image.height));
            dispatch(setDisplay('puzzle_canvas'));
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



