import React,{Component} from 'react';
import Recipe from './Recipe.js';
import * as $ from 'axios';

export default class RecipeBox extends Component{
    state={
        typeOfRecipes:this.props.typeOfRecipes,
        recipes:[],
    };
    // get call; all, favorite, or one
    getRecipes=(type)=>{
        console.log(type);
        $.get(`/api/recipes/${type}/${this.props.userId}`)
        .then((result)=>{
            console.log(result.data);
            this.setState({recipes:result.data});
            // console.log(this.state.recipes)
        });
    };
    componentDidMount(){
        this.getRecipes(this.props.typeOfRecipes);
    };
    render(){
        return(
            <div>
                {this.state.recipes.length===0 ? <h1 className="giveBackgroundColor margins10Per">There are no recipes stored yet.</h1> : null }
                {this.state.recipes.map((recipe,index)=>{
                    return(
                        <Recipe key={`recipe${index}`} recId={recipe._id} name={recipe.recipeName} ingredients={recipe.ingredients} directions={recipe.directions} favorite={recipe.favorite} renderAll={this.renderAll} renderFaves={this.renderFaves} rerender={()=>this.getRecipes(this.state.typeOfRecipes)}/>
                    )
                })}
            </div>
        )
    };
};