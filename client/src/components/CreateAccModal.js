import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,Label,Input,FormText } from 'reactstrap';
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
    };

    this.toggle = this.toggle.bind(this);
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  };
  handleInputChange=(event)=>{
    this.setState({
        [event.target.name]:event.target.value
    });
  };
  validateInformation=()=>{
    const pass1=document.getElementById('newPass');
    const pass2=document.getElementById('newPassConf');      
    
  };
  postNewAccount=()=>{
    // console.log('button clicked');
    $.post('/api/users/create',{
        username:this.state.newUsername,
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
        <a className='text-primary' onClick={this.toggle}>Click here to create an account.</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create RecipeBox Account</ModalHeader>
          <ModalBody>
            <Form>
                <FormGroup>
                    <Label for='newUsername'>Username</Label>
                    <Input type='text' name='newUsername' id='newUsername' placeholder='Create username.' onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for='newPass'>Password</Label>
                    <Input type='password' name='newPass' id="newPass" placeholder='Create a password.' onChange={this.handleInputChange}/>
                    <Input type='checkbox' onClick={()=>{this.displayPassword('newPass')}}/>
                    Show password
                </FormGroup>
                <FormGroup>
                    <Input type='password' name='newPassConf' id="newPassConf" placeholder='Re-enter your password.' onChange={this.handleInputChange}/>
                    <Input type='checkbox' onClick={()=>{this.displayPassword('newPassConf')}}/>
                    Show password
                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button disabled={!this.state.btnEnabled} color="primary" onClick={this.postNewAccount}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}