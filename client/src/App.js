import React, { Component } from 'react';
import Login from './components/Login';
import RecipeBox from './components/RecipeBox';
import MobileNav from './components/MobileNav.js';
import WebNav from './components/WebNav.js';
import MediaQuery from 'react-responsive';
import CreateAccModal from './components/CreateAccModal.js';
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
    this.setState({showRecipes:true,showShopList:false})
  };
  handleShopListClick=()=>{
    this.setState({showRecipes:false,showShopList:true})
  };
  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn===false ? <div><Login handleLogin={this.handleLogin}/> <CreateAccModal/></div>: 
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
