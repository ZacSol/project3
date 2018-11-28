const db=require('../models/index.js');

module.exports = function (app) {

    // Creates new user login
    app.post('/api/users/create',function(req,res){
        db.Users.create(req.body)
        .then(function(data){
            res.json({success:true});
        }).catch(function(err){
            res.json(err);
        })
    })
    // Used to check usersDb for login information, returns the user's _id
    app.post('/api/users/login',function(req,res){
        db.Users.find(req.body)
        .then(function(data){
            res.json(data[0]._id);
        }).catch(function(err){
            res.json(err);
        });
    });
    
    // Adds new recipe to recipesDb
    app.post('/api/recipes/one',function(req,res){
        db.Recipes.create(req.body)
        .then(function(data){
            res.json({success:true});
        });
    });
    // gets all recipes
    app.get('/api/recipes/all',function(req,res){
        db.Recipes.find({})
        .then(function(data){
            res.json(data);
        });
    });
    // gets favorite recipes
    app.get('/api/recipes/all',function(req,res){
        db.Recipes.find({favorite:true})
        .then(function(data){
            res.json(data);
        });
    });
    // finds one recipe to update

    // Gathers items from the shoppingList 
    app.get('/api/shoppinglist',function(req,res){
        db.ShoppingList.find({})
        .then(function(data){
            res.json(data);
        }).catch(function(err){
            res.json(err);
        });
    });


}