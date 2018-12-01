import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as $ from 'axios';

export default class DeleteBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  deleteRecipe=()=>{
    this.toggle();
    console.log(this.props.recId);
    $.delete(`/api/recipes/one/${this.props.recId}`)
    .then(function(response){ 
        // console.log(response.data.success);
        if(response.data.success===true){
            console.log("deleted");
            this.props.rerender();
        };
    });
  };

  render() {
    return (
      <div>
        <Button outline color="secondary" name={this.props.recId} onClick={this.toggle}><FontAwesomeIcon icon={'times'} /></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you certain that you want to delete {this.props.name}?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
            <Button color="primary" onClick={this.deleteRecipe}>Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };
};