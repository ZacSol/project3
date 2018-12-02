import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Col,Form,FormGroup,Label,Input,NavLink } from 'reactstrap';
import * as $ from 'axios';


export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newName:'',
      newIngredients:[],
      newDirections:'',
      btnEnabled:false,
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
    this.enableAddBtn();
  };
  handleKeyPress=(event)=>{
    if(event.key==="Enter"){
      event.preventDefault();
      // console.log("Enter Pressed");
      // console.log(event.target.value);
      this.addIngredientToList(event.target.value);
      event.target.value="";
    };
  };
  addIngredientToList=(ingredient)=>{
    // console.log(ingredient);
    const joined=this.state.newIngredients.concat(ingredient);
    this.setState({newIngredients:joined});
  };
  emptyIngredients=(event)=>{
    event.preventDefault();
    this.setState({newIngredients:[]});
  };
  enableAddBtn=()=>{
    if(this.state.newName&&this.state.newIngredients.length>0&&this.state.newDirections){
      this.setState({btnEnabled:true});
    }else{
      this.setState({btnEnabled:false});
    };
  };
  postNewRecipe=()=>{
    const newRec={
      userId:this.props.userId,
      recipeName:this.state.newName,
      ingredients:this.state.newIngredients,
      directions:this.state.newDirections,
      favorite:false
    };
    const self=this;
    $.post("/api/recipes/one",newRec)
    .then(function(response){
      // console.log(response)
      // console.log(response.data.success)
      if(response.data.success){
        self.toggle(); 
        self.setState({
          modal: false,
          newName:'',
          newIngredients:[],
          newDirections:'',
          btnEnabled:false,
        });
        console.log('trying to render now');
        self.props.handleAddItemRerender();
      }else{
        alert("There was an error posting the information.");
      };
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
                <Col sm={6}  className="addRightBorder addTopBorder addBottomBorder">
                  <Label for="newIngredients">Ingredients: <Button color="link" onClick={this.emptyIngredients}>Empty List</Button></Label>
                  <Input type='text' id='oneNewIngredient' placeholder="Press enter to add ingredient." onKeyPress={this.handleKeyPress}/>
                  {this.state.newIngredients.map((item,index)=>(
                    <li key={index}>{item}</li>
                  ))}
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
            <Button color="primary" disabled={!this.state.btnEnabled} onClick={this.postNewRecipe}>Add Recipe</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}