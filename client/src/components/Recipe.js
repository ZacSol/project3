import React,{Component} from 'react';
import { Button, Collapse, CardBody, Card,Row,Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
        collapse: false,
        favorite:this.props.favorite
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFavorite=(event)=>{
      event.preventDefault();
      console.log(event.target.name);
      // needs to make axios update to favorite bool ***************************
    this.setState({favorite:!this.state.favorite})
  };
  deleteRecipe=(event)=>{
      event.preventDefault();
      console.log("event.target.name "+event.target.name);
  }

  render() {
    return (
        <div>
            <Card style={{marginTop:'10px'}}>
                <Row>
                    <Col xs={2} style={{paddingTop:'5px'}}><Button outline color="secondary" name={this.props.recId} onClick={this.deleteRecipe}><FontAwesomeIcon icon={'times'} /></Button></Col>
                    <Col xs={8}><h3 className="card-title" onClick={this.toggle}>{this.props.name}</h3></Col>
                    <Col xs={2} style={{paddingTop:'5px'}} onClick={this.toggleFavorite}>{this.state.favorite ? <Button outline color="secondary" name={this.props.recId}><FontAwesomeIcon icon={['fas','star']} name={this.props.recId}/></Button>:<Button outline color="secondary" name={this.props.recId}><FontAwesomeIcon icon={['far','star']} name={this.props.recId}/></Button>}</Col>
                </Row>
                <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                        <Row>
                            <Col sm style={{marginBottom:'25px'}}><h5>Ingredients:</h5>{this.props.ingredients.map((ingredient,index)=>(
                                <li key={index}>{ingredient}</li>
                            ))}</Col>
                            <Col sm><h5>Cooking Directions:</h5>{this.props.directions}</Col>
                        </Row>
                    </CardBody>
                </Collapse>
            </Card>
        </div>
    );
  }
}