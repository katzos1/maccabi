import React, { useEffect } from 'react'
import {doCreateUser,clearUserErrorMessage} from '../../actions'
import {connect} from 'react-redux'
import { useForm } from "react-hook-form";
import _ from 'lodash'
import Input from "../../form-components/Input";
import Password from '../../form-components/Password';
import Button from '../../form-components/Button';
import Message from "../../form-components/Message";

import './Auth.css'

const Register = (props) => {
    const {register,handleSubmit,formState: { errors }} = useForm();
    const {history,user} = props;

    //check if register success or you alread logged in
    useEffect(()=>{
        if (user.isLoggedIn){
            history.push('/');
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user]);    

    //clear error messages if there are any
    useEffect(()=>{
    props.clearUserErrorMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);



    const renderErrorMessage = () => {
        if (_.isEmpty(errors) && !props.user.errorMessage) return null;
        return (
            <Message>
                <h3>Errors</h3>
                <p>{props.user.errorMessage}</p>
                <p>{errors.userName?.message}</p>
                <p>{errors.password?.message}</p>
                <p>{errors.nickName?.message}</p>
            </Message>
        )
    };

    const onSubmit = (data) =>{
        console.log('Submit',data);
        //pass to redux
        props.doCreateUser(data);
    };

        return (
            <div id="login-container" className="ui container">
                <form onSubmit={handleSubmit(onSubmit)} className="ui form">
                    <h1><i className="american sign language interpreting icon"></i> Register to MaccabiChat</h1>
                  
                   <Input label='* Enter User Name' autoComplete="username" validation={{...register('userName', 
                    { required: 'Username Required',
                     minLength:{value: 2,message:'Username minimum length:2'},
                     maxLength:{value: 10,message:'Username maximum length:10'} })}} />

 
                    <Input label='* Enter Nickname' validation={{...register('nickName', 
                    { required: 'Nickname Required',
                     maxLength:{value:20,message:'Nickname maximum length:20'} })}} />


                    <Password label='* Enter Password' validation={{...register('password', 
                    { required: 'Password Required',
                     minLength:{value:4,message:'Password minimum length:4'},
                     maxLength:{value:16,message:'Password maximum length:16'} })}} />


                    <Button type='submit'>Register</Button>
                    {renderErrorMessage()}
                </form>
            </div>
        )

};

const mapStateToProps = (state) => ({user:state.user});
export default connect(mapStateToProps,{
    doCreateUser,
    clearUserErrorMessage
})(Register);