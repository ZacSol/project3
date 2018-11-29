import React,{Component} from 'react';
import { Collapse, CardTitle, CardBody, Card,Row,Col } from 'reactstrap';

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
        <div>
            <Card onClick={this.toggle}>
                <CardTitle>{this.props.name}</CardTitle>
                <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                        <Row>

                            <Col>Ingredients:<br/><br/>{this.props.ingredients.map((ingredient)=>(
                                <p>{ingredient}</p>
                            ))}</Col>
                            <Col>Cooking Directions:<br/>{this.props.directions}</Col>
                        </Row>
                    </CardBody>
                </Collapse>
            </Card>
        </div>
    );
  }
}