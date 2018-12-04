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
        type:Array,
        required:"Cooking Directions are required."
    },
    favorite:{
        type:Boolean,
        default:false
    },
    userId:{
        type:String,
    }
});

const Recipes=mongoose.model('Recipes',RecipesSchema);
module.exports=Recipes;