import React,{Component} from 'react';
import { Button, Collapse, CardBody, Card,Row,Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteBtn from './DeleteBtn.js';
import * as $ from 'axios';

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
  toggleFavoriteDb=(RecipeId)=>{
    // console.log(RecipeId);      
    this.setState({favorite:!this.state.favorite});
    // needs to make axios update to favorite bool 
    $.put(`/api/recipes/one/${RecipeId}`,{favorite:!this.state.favorite})
    .then(function(response){
        // console.log(response);
        if(response.data.error){
            alert('There was an error updating the favorite.')
        }else if(response.data.success){
            // console.log("Success")
        };
    });
  };
  passRender=()=>{
      this.props.rerender();
  }
  render() {
    return (
        <div>
            <Card style={{marginTop:'10px'}}>
                <Row>
                    <Col xs={3} style={{paddingTop:'6px'}}><DeleteBtn recId={this.props.recId} name={this.props.name} rerender={this.passRender}/></Col>

                    <Col xs={6}><h3 className="card-title" onClick={this.toggle}>{this.props.name}</h3></Col>

                    <Col xs={3} style={{paddingTop:'6px'}} onClick={()=>this.toggleFavoriteDb(this.props.recId)}>{this.state.favorite ? <Button outline color="secondary" name={this.props.recId}><FontAwesomeIcon icon={['fas','star']} name={this.props.recId}/></Button>:<Button outline color="secondary" name={this.props.recId}><FontAwesomeIcon icon={['far','star']} name={this.props.recId}/></Button>}</Col>
                </Row>
                <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                        <Row>
                            <Col sm style={{marginBottom:'25px'}}><h5>Ingredients:</h5><ul>{this.props.ingredients.map((ingredient,index)=>(
                                <li key={index}>{ingredient}</li>
                            ))}</ul></Col>
                            <Col sm><h5>Cooking Directions:</h5><ol>{this.props.directions.map((step,index)=>(
                                <li key={index}>{step}</li>
                            ))}</ol></Col>
                        </Row>
                    </CardBody>
                </Collapse>
            </Card>
        </div>
    );
  }
}