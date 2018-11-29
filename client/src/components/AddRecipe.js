import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Container,Row,Col,Form,FormGroup,Label,Input,NavLink } from 'reactstrap';

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newName:'',
      newIngredients:'',
      newDirections:'',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleInputChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    });
  };
  render() {
    return (
      <div>
        <NavLink className="text-white" href="#" onClick={this.toggle}>Add Recipe</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add New Recipe</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="newName" sm={3}>Recipe Name</Label>
                <Col sm={9}>
                  <Input type="text" name="newName" id="newName" onChange={this.handleInputChange}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={6}>
                  <Label for="newIngredients">Ingredients:</Label>
                  <Input type='text' id='oneNewIngredient' placeholder="Press enter to add ingredient."/>
                </Col>
                <Col sm={6} className="addLeftBorder">
                  <Label for="newDirections">Cooking Instructions:</Label>
                  <Input type='textarea' name='newDirections' id='newDirections' rows={10} onChange={this.handleInputChange}/>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Add Recipe</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}