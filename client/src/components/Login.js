import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as $ from "axios";

export default class Login extends Component{
    state={
        username:"",
        password:"",
        displayName:"",
    };
    handleInputChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };
    // checks validity of user credentials, if successful sends data to App.js
    checkValidUser=()=>{
        // console.log("checking user");
        $.post('/api/users/login',{
            username:this.state.username.toLowerCase(),
            password:this.state.password
        })
        .then((result)=>{
            // console.log(result.data);
            if(result.data[0]){
                // console.log("confirmed");
                this.props.handleLogin({
                    id:result.data,
                    name:this.state.username,
                    displayName:this.state.displayName
                });
            }else{
                console.log(result);
                alert("Invalid username/password. Please try again");
            };
        });
    };
    handleKeypress=(event)=>{
        if(event.key==="Enter"){
            // console.log("Enter pressed.");
            this.checkValidUser();
        };
    };
    render() {
        return (
            <div>
                <h1 id='welcomeHead'>Welcome to RecipeBox!</h1>
                <Form id='loginForm'>
                    <FormGroup>
                        <Label for="loginUsername"></Label>
                        <Input type="text" name="username" placeholder="Username" id="loginUsername" onChange={this.handleInputChange} style={{ textAlign: 'center' }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='loginPassword'></Label>
                        <Input type="password" name="password" placeholder="Password" id='loginPassword' onChange={this.handleInputChange} style={{ textAlign: 'center' }} onKeyPress={this.handleKeypress}/>
                    </FormGroup>
                    <Button color='secondary' id='loginBtn' onClick={(event) => { event.preventDefault(); this.checkValidUser() }}>Log In</Button>
                </Form>
                <br />
            </div>
        )
    };
};