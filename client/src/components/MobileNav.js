import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="secondary" light>
          <NavbarBrand className="text-white" href="#" className="mr-auto" onClick={()=>{this.props.handleRecipeClick()}}>RecipeBox</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="text-white" href="#" onClick={()=>{this.props.handleRecipeClick()}}>My Recipes</NavLink>
              </NavItem>
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