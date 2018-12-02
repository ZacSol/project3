import React, { Component } from 'react';
import LoginPage from './pages/LoginPage.js';
import RecipeBox from './components/RecipeBox';
import WebNav from './components/WebNav.js';
import ShopList from './components/ShopList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './App.css';
library.add(fasStar, farStar, faTimes);

class App extends Component {
  state={
    isLoggedIn:false,
    userId:"",
    username:"",
    showRecipes:false,
    showFavorites:false,
    showShopList:false,
    typeOfRecipes:'all',
  };
  // grabs user data from login component
  handleLogin=user=>{
    this.setState({
      userId:user.id,
      username:user.name,
      displayName:user.displayName,
      isLoggedIn:true,
      showRecipes:true,
      typeOfRecipes:"all",
    });
  };
  handleLogout=()=>{
    this.setState({
      userId:"",
      username:"",
      isLoggedIn:false,
      showRecipes:false,
    });
  };
  handleRecipeClick=()=>{
    this.setState({showRecipes:true,showFavorites:false,showShopList:false,typeOfRecipes:'all'});
  };
  handleFavoriteClick=()=>{
    this.setState({showRecipes:false,showFavorites:true,showShopList:false,typeOfRecipes:"favorite"});
  };
  handleShopListClick=()=>{
    this.setState({showRecipes:false,showFavorites:false,showShopList:true})
  };
  handleAddItemRerender=()=>{
    console.log('running in App.js');
    this.setState({reloadStateItem:!this.state.reloadStateItem})
  };
  render() {
    return (
      <div className="App" id='backgroundDiv'>
        {this.state.isLoggedIn === false ? <LoginPage handleLogin={this.handleLogin} /> :
          <div>
            <WebNav userId={this.state.userId} handleAddItemRerender={this.handleAddItemRerender} handleRecipeClick={this.handleRecipeClick} handleShopListClick={this.handleShopListClick} handleLogout={this.handleLogout} handleFavoriteClick={this.handleFavoriteClick} />
            
            {this.state.showRecipes === true ? <RecipeBox reloadStateItem={this.state.reloadStateItem} userId={this.state.userId} typeOfRecipes={this.state.typeOfRecipes} /> : null}

            {this.state.showFavorites === true ? <RecipeBox reloadStateItem={this.state.reloadStateItem} userId={this.state.userId} typeOfRecipes={this.state.typeOfRecipes} /> : null}

            {this.state.showShopList === true ? <ShopList userId={this.state.userId}/> : null}
          </div>}
      </div>
    );
  };
};

export default App;
