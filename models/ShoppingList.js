const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ShoppingListSchema=new Schema({
    items:{
        type:Array
    }
});

const ShoppingList=mongoose.model("ShoppingList",ShoppingListSchema);
module.exports=ShoppingList;