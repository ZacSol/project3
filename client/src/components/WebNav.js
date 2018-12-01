import React from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink}from 'reactstrap';
import AddRecipe from './AddRecipe.js';

export default class WebNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="secondary" dark expand="sm">
          <NavbarBrand className="text-white" href="#" onClick={()=>{this.props.handleRecipeClick()}}>RecipeBox</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="text-white" href="#" onClick={()=>{this.props.handleRecipeClick()}}>My Recipes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-white" href="#" onClick={()=>{this.props.handleFavoriteClick()}}>Favorites</NavLink>
              </NavItem>
              <NavItem><AddRecipe/></NavItem>
              <NavItem>
                <NavLink className="text-white" href="#" onClick={()=>{this.props.handleShopListClick()}}>ShoppingList</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink className="text-white" href="#" onClick={()=>{this.props.handleLogout()}}>Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}