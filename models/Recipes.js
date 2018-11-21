const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RecipesSchema=new Schema({
    recipeName:{
        type:String,
        required:"A recipe name is required."
    },
    ingredients:{
        type:Array,
        required:"Ingredients are required."
    },
    directions:{
        type:String,
        required:"Cooking Directions are required."
    }
});

const Recipes=mongoose.model('Recipes',RecipesSchema);
module.exports=Recipes;