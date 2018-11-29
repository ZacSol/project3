import React,{Component} from 'react';
import Login from '../components/Login.js';
import CreateAccModal from '../components/CreateAccModal.js';

export default class LoginPage extends Component{
    state={

    }
    render(){
        return(
            <div>
                <div id='emptyAboveLogin'></div>
                <div className="giveBackgroundColor" id="loginPage">
                    <Login handleLogin={this.props.handleLogin}/>
                    <CreateAccModal />
                </div>
            </div>
        )
    }
}