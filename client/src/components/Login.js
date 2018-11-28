import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as $ from "axios";

export default class Login extends Component{
    state={
        username:"",
        password:"",
    };
    handleInputChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };
    // checks validity of user credentials, if successful sends data to App.js
    checkValidUser=()=>{
        // console.log("checking user");
        $.post('/api/users/login',this.state)
        .then((result)=>{
            // console.log(result.data);
            if(result.data[0]){
                // console.log("confirmed");
                this.props.handleLogin({
                    id:result.data,
                    name:this.state.username
                });
            }else{
                console.log(result);
                alert("Invalid username/password. Please try again");
            };
        });
    };
    render() {
        return (
            <div>
                <div id='emptyAboveLogin'></div>
                <h1 id='welcomeHead'>Welcome to RecipeBox!</h1><br/>
                <Form id='loginForm'>
                    <FormGroup>
                        <Label for="loginUsername">Username</Label>
                    <Input type="text" name="username" placeholder="" id="loginUsername" onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='loginPassword'>Password</Label>
                    <Input type="password" name="password" placeholder="" id='loginPassword' onChange={this.handleInputChange}/>
                    </FormGroup>
                    <Button color='secondary' id='loginBtn' onClick={(event)=>{event.preventDefault();this.checkValidUser()}}>Log In</Button>
                </Form>
                <br/>
            </div>
        )
    };
};