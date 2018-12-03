import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Col,Form,FormGroup,Label,Input,NavLink,Row } from 'reactstrap';
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
      oneNewIngredient:"",
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
  handleAddItemBtn=(event)=>{
    const input=document.getElementById('oneNewIngredient');
    event.preventDefault();
    this.addIngredientToList(this.state.oneNewIngredient);
    input.value="";
    input.focus();
  }
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
        // console.log('trying to render now');
        self.props.toggle();
        self.props.refreshFlip();
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
                  <Row>
                    <Col xs={9}> <Input type='text' name="oneNewIngredient" id='oneNewIngredient' placeholder="Press enter or click to add." onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/></Col><Col xs={3} style={{padding:'0px'}}><Button onClick={this.handleAddItemBtn}>Add</Button></Col>
                  </Row><br/>
                  {this.state.newIngredients.length>0 ? <div>{this.state.newIngredients.map((item,index)=>(
                    <li key={index}>{item}</li>
                  ))}<br/></div> : null}
                </Col>
                <Col sm={6} className='addTopBorder addBottomBorder'>
                  <Label for="newDirections">Cooking Instructions:</Label>
                  <Input type='textarea' name='newDirections' id='newDirections' rows={10} onChange={this.handleInputChange}/>
                  <br/>
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