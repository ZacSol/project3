import React,{Component} from 'react';
import * as $ from 'axios';

export default class RecipeBox extends Component{
    state={
        recipes:{},
    };
    // get call; all, favorite, or one
    getRecipes=(type)=>{
        $.get(`/api/recipes/${type}`)
        .then((result)=>{
            // console.log(result);
            this.setState({recipes:result.data});
        });
    };
    componentDidMount(){
        this.getRecipes("all");
    };
    render(){
        return(
            <div>
                <h1>This is the RecipeBox.</h1>
                {this.recipes.map((recipe,index)=>{
                    
                })}
            </div>
        )
    };
};