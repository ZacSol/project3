const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UsersSchema=new Schema({
    username:{
        type:String,
        required:"A username is required."
    },
    password:{
        type:String,
        required:"A password is required."
    }
});

const Users=mongoose.model('Users',UsersSchema);
module.exports=Users;