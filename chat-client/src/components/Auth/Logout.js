import { useEffect } from "react";
import {  connect } from "react-redux";
import {doLogout} from '../../actions'
import './Auth.css'

const Logout = (props) =>{

    const {history,user} = props;

    console.log(props);

    //check if user discconected, if so redirect to login
    useEffect(()=>{

        if (!user.isLoggedIn){
            history.push('/login');
        }
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user]);    

   

    return  (<div id="login-container" className="ui container">
        <h1>{user.nickName}, Are you sure that you want to logout?</h1>
        <button id="logout-button" onClick={()=>props.doLogout()} className="ui inverted red button">LogOut now</button>
    </div>)
}


const mapStateToProps = (state) => ({user:state.user});
export default connect(mapStateToProps,{doLogout})(Logout);