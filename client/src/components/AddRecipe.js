import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Col,Form,FormGroup,Label,Input,NavLink } from 'reactstrap';

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newName:'',
      newIngredients:[],
      newDirections:'',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleInputChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    });
  };
  handleKeyPress=(event)=>{
    if(event.key==="Enter"){
      // console.log("Enter Pressed");
      // console.log(event.target.value);
      this.addIngredientToList(event.target.value);
      event.target.value="";
    };
  };
  addIngredientToList=(ingredient)=>{
    console.log(ingredient);
    
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
                <Col sm={6}  className="addRightBorder addTopBorder addBottomBorder">
                  <Label for="newIngredients">Ingredients:</Label>
                  <Input type='text' id='oneNewIngredient' placeholder="Press enter to add ingredient." onKeyPress={this.handleKeyPress}/>
                </Col>
                <Col sm={6} className='addTopBorder addBottomBorder'>
                  <Label for="newDirections">Cooking Instructions:</Label>
                  <Input type='textarea' name='newDirections' id='newDirections' rows={10} onChange={this.handleInputChange}  style={{marginBottom:'10px'}}/>
                  {/* {this.newIngredients.map((ingredient,index)=>(
                    <p>{ingredient}</p>
                  ))} */}
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