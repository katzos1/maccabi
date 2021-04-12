import React from 'react'
import {connect} from 'react-redux'
import {doLogin,clearUserErrorMessage} from '../../actions'
import Input from "../../form-components/Input";
import Password from "../../form-components/Password";
import Button from "../../form-components/Button";
import Message from "../../form-components/Message";



import './Auth.css'

class Login extends React.Component {
    //Default State
    state = {
        userName: '',
        password: '',
        errorMessage: ''
    }

    onUserNameChange = (e) => {
        const value = e.target.value;
        this.setState({ userName: value})
    }

    onPasswordChange = (e)=>{
        const value = e.target.value;
        this.setState({ password: value}) 
    }

    componentDidMount(){
        console.log('componentDidMount',this.props);
        //check if the current user already loggedin, if so redirect to logout
        if (this.props.user.isLoggedIn) this.props.history.push('/logout');

        this.props.clearUserErrorMessage();

    }

    //Check if PROPS LoggedIn Chang
    componentWillReceiveProps(nextProps)
    {
        //console.log('componentWillReceiveProps',nextProps);

        //user success login
        if (nextProps.user.isLoggedIn) {
            console.log('pushing');
            this.props.history.push('/');
        }

    }


    onLoginSubmit = (e)=> {
        e.preventDefault();

        if (this.state.userName.length<2 || this.state.userName.length>20){
            this.setState({errorMessage:'Please enter valid username, you exceed the 2-20 character limit'});
            return;
        }
        if (this.state.password.length<2 || this.state.password.length>20){

            this.setState({errorMessage:'Please enter valid password, you exceed the 2-20 character limit'});
            return;
        }


        //clear set state
        this.setState({errorMessage:''});
        console.log("Sending Login Request");
        //form valid, sending login request to the api
       this.props.doLogin(this.state.userName,this.state.password);
    }

    renderErrorMessage = () => {

        const {errorMessage} = this.props.user;
        if (!this.state.errorMessage && !errorMessage) return null;
        const message = this.state.errorMessage  ? this.state.errorMessage : errorMessage;

        return <Message>
               <h3>ERROR</h3>
               {message}
              </Message>;
    }

    render() {
        return (
            <div id="login-container" className="ui container">
                <form className="ui form">
                    <h1><i className="key icon"></i> Login to MaccabiChat</h1>
                    {this.renderErrorMessage()}

                    <Input label="Enter Username" name="userName" autoComplete="username" onChange={this.onUserNameChange} value={this.state.userName} placeholder="Username" />
                    <Password label="Enter Password" onChange={this.onPasswordChange} value={this.state.password} placeholder="Password" />
                    <Button onClick={this.onLoginSubmit}>Login</Button>
                </form>

            </div>)
    }
}

const mapStateToProps = (state) => ({user:state.user});
export default connect(mapStateToProps,{doLogin,clearUserErrorMessage})(Login);