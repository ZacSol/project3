import React,{Component} from 'react';

export default class Recipe extends Component{
    state={
        name:"",
        ingredients:[],
        directions:"",
    };
    render(){
        return(
            <div>
                <p>{this.props.name}</p>
            </div>
        )
    }
}