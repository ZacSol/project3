import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,Label,Input,FormFeedback } from 'reactstrap';
import * as $ from 'axios';

export default class CreateAccModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newUsername:"",
      newPass:"",
      newPassConf:"",
      btnEnabled:false,
      passwordsMatch:false,
      invalidName:false,
    };

    this.toggle = this.toggle.bind(this);
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal,
      btnEnabled:false,
      passwordsMatch:false,
      invalidName:false
    });
  };
  handleInputChange=(event)=>{
    let el=event.target;
    // console.log(el);
    this.setState({
        [event.target.name]:event.target.value
    });
    this.doPasswordsMatch(el);
    this.enableSubmitBtn()
  };
  enableSubmitBtn=()=>{
    const pass1=document.getElementById('newPass');      
    const pass2=document.getElementById('newPassConf');      

    if(this.state.newUsername&&this.state.newPass&&this.state.newPassConf&&pass1.value===pass2.value){
      this.setState({btnEnabled:true});
    }else{
      this.setState({btnEnabled:false})
    }
  };
  // when typing into the boxes, check that the passwords match
  doPasswordsMatch=(element)=>{
    const pass2=document.getElementById('newPassConf');      
    if(element===pass2){
      // console.log('element matches passwordConf bar')
      if(this.state.newPass===pass2.value){
        // console.log("passwords match");
        this.setState({passwordsMatch:true});
      }else{
        this.setState({passwordsMatch:false});
      };
    };
  };
  // after hitting submit button, run validations
  validateUsername=()=>{
    // check if username already exists
    $.post('/api/users/login',{username:this.state.newUsername.toLowerCase()})
    .then((response)=>{
      // console.log(typeof(response.data));
      if(typeof(response.data)==="string"){
      // console.log("user exists");
        this.setState({invalidName:true})
      }else{
        this.setState({invalidName:false,passwordsMatch:false})
        this.postNewAccount();
      }
    })
  };
  postNewAccount=()=>{
    // console.log('button clicked');
    $.post('/api/users/create',{
        username:this.state.newUsername.toLowerCase(),
        displayName:this.state.newUsername,
        password:this.state.newPass
    }).then((response)=>{
        console.log(response)
    }).catch((error)=>{
        console.log(error)
    });
    // toggle modal if successfully created account
    this.toggle();
  };
  displayPassword=(elementName)=>{
    const passBox=document.getElementById(elementName);
    if(passBox.type==='password'){
        passBox.type='text';
    }else{
        passBox.type='password';
    };
  };
  render() {
    return (
      <div>
        <a href='#' className='text-primary raiseMeUp' onClick={this.toggle}>Click here to create an account.</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create RecipeBox Account</ModalHeader>
          <ModalBody>
            <Form>
                <FormGroup>
                    <Label for='newUsername'>Username</Label>
                    <Input type='text' name='newUsername' id='newUsername' placeholder='Create username.' invalid={this.state.invalidName} onChange={this.handleInputChange}/>
                    <FormFeedback invalid>This username is already taken.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for='newPass'>Password</Label>
                    <Input type='password' name='newPass' id="newPass" valid={this.state.passwordsMatch} placeholder='Create a password.' onChange={this.handleInputChange}/>
                    <Input type='checkbox' className='modalCheckbox' id='newPassCheck' onClick={()=>{this.displayPassword('newPass')}}/>
                    <Label className='showPassLabel' for='newPassCheck' check>Show password</Label>
                </FormGroup>
                <FormGroup>
                    <Input type='password' name='newPassConf' id="newPassConf" placeholder='Re-enter your password.' valid={this.state.passwordsMatch} onChange={this.handleInputChange}/>
                    <FormFeedback valid>The passwords match.</FormFeedback>
                    <Input type='checkbox' className='modalCheckbox' id='newPassConfCheck' onClick={()=>{this.displayPassword('newPassConf')}}/>
                    <Label className='showPassLabel' for='newPassConfCheck' check>Show password</Label>
                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button disabled={!this.state.btnEnabled} color="primary" onClick={this.validateUsername}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}