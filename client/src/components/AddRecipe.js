import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Col,Form,FormGroup,Label,Input,NavLink,Row } from 'reactstrap';
import * as $ from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newName:'',
      newIngredients:[],
      newDirections:[],
      btnEnabled:false,
      oneNewIngredient:"",
      oneNewDirection:"",
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
    this.enableAddBtn();
  };
  handleKeyPressDir=(event)=>{
    if(event.key==="Enter"){
      event.preventDefault();
      // console.log("Enter Pressed");
      // console.log(event.target.value);
      this.addDirectionToList(event.target.value);
      event.target.value="";
    };
  };
  addDirectionToList=(direction)=>{
    // console.log(ingredient);
    const joined=this.state.newDirections.concat(direction);
    this.setState({newDirections:joined});
  };
  handleAddDirBtn=(event)=>{
    const input=document.getElementById('oneNewDirection');
    event.preventDefault();
    this.addDirectionToList(this.state.oneNewDirection);
    input.value="";
    input.focus();
    this.enableAddBtn();
  };
  enableAddBtn=()=>{
    if(this.state.newName&&this.state.oneNewDirection&&this.state.oneNewIngredient){
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
  removeItem=(index)=>{
    console.log(index);
    const newList=this.state.newIngredients;
    newList.splice(index,1)
    this.setState({newIngredients:newList})
  };
  removeDir=(index)=>{
    console.log(index);
    const newList=this.state.newDirections;
    newList.splice(index,1)
    this.setState({newDirections:newList})
  };
  render() {
    return (
      <div>
        <NavLink className="text-white" href="#" onClick={()=>{this.toggle();this.props.toggle()}}>Add Recipe</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} style={{maxWidth:'800px'}}>
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
                  <Row>
                    <Col xs={9}> <Input type='text' name="oneNewIngredient" id='oneNewIngredient' placeholder="Pressing enter can add." onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/></Col><Col xs={3} style={{padding:'0px'}}><Button onClick={this.handleAddItemBtn}>Add</Button></Col>
                  </Row><br/>
                  {this.state.newIngredients.length>0 ? <div>{this.state.newIngredients.map((item,index)=>(
                    <div key={`dirIng${index}`}><Row><Col xs={2}><Button outline color="secondary" onClick={(event)=>{event.preventDefault();this.removeItem(index)}} name={index} style={{padding:'0px 6px'}}><FontAwesomeIcon icon={'times'}/></Button></Col><Col xs={10}><li key={index} style={{listStyle:'none'}}>{item}</li></Col></Row></div>
                  ))}<br/></div> : null}
                </Col>
                <Col sm={6} className='addTopBorder addBottomBorder'>
                  <Label for="newDirections">Cooking Instructions:</Label>
                  <Row><Col xs={9}> <Input type='text' name='oneNewDirection' id='oneNewDirection' placeholder="Pressing enter can add." onChange={this.handleInputChange} onKeyPress={this.handleKeyPressDir}/></Col><Col xs={3} style={{padding:'0px'}}><Button onClick={this.handleAddDirBtn}>Add</Button></Col></Row>
                  <br/>
                  {this.state.newDirections.length>0 ? <div><ol style={{padding:'0px'}}>{this.state.newDirections.map((item,index)=>(
                    <div key={`dirDiv${index}`}><Row><Col xs={3}><Button outline color="secondary" onClick={(event)=>{event.preventDefault();this.removeDir(index)}} name={index} style={{padding:'0px 6px'}}><FontAwesomeIcon icon={'times'}/></Button></Col><Col xs={9}><li key={index}>{item}</li></Col></Row></div>
                  ))}<br/></ol></div> : null}
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={!this.state.btnEnabled} onClick={this.postNewRecipe}>Add Recipe</Button>{' '}
            <Button color="secondary" onClick={()=>{this.toggle();this.setState({newDirections:[],newIngredients:[],oneNewDirection:"",oneNewIngredient:"",newName:""})}}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}