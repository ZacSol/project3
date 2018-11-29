import React, { Component } from 'react';
import LoginPage from './pages/LoginPage.js';
import RecipeBox from './components/RecipeBox';
import MobileNav from './components/MobileNav.js';
import WebNav from './components/WebNav.js';
import MediaQuery from 'react-responsive';
import ShopList from './components/ShopList';
import './App.css';

class App extends Component {
  state={
    isLoggedIn:false,
    userId:"",
    username:"",
    showRecipes:false,
  };
  // grabs user data from login component
  handleLogin=user=>{
    this.setState({
      userId:user.id,
      username:user.name,
      isLoggedIn:true,
      showRecipes:true,
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
    this.setState({showRecipes:true})
  };
  handleShopListClick=()=>{
    this.setState({showRecipes:false})
  };
  render() {
    return (
      <div className="App" id='backgroundDiv'>
        {this.state.isLoggedIn===false ? <LoginPage handleLogin={this.handleLogin}/>: 
        <div>
        <MediaQuery maxDeviceWidth={1023}>
            <MobileNav handleRecipeClick={this.handleRecipeClick} handleShopListClick={this.handleShopListClick} handleLogout={this.handleLogout}/>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024}>
            <WebNav handleRecipeClick={this.handleRecipeClick} handleShopListClick={this.handleShopListClick} handleLogout={this.handleLogout}/>
        </MediaQuery>
        {this.state.showRecipes ? <RecipeBox/> : <ShopList/>}
        </div>}
      </div>
    );
  };
};

export default App;
