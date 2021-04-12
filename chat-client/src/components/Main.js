import React from 'react'
import { connect } from 'react-redux'
import RoomList from "./Chat/RoomList"
import {fetchRooms} from '../actions'

class Main extends React.Component {
    componentDidMount() {
        //get rooms
        this.props.fetchRooms();
    }
   
    isLoggedIn = () =>{
      return this.props.user.isLoggedIn;   
    }

    renderChatRooms = () =>{
        //if user not logged in, don't show rooms
        if (!this.isLoggedIn) return  <div>You need to register/login In order to get access to chat</div>;

        return(
            <div>
                <h4>Choose a room for chat</h4>
                 <RoomList rooms={this.props.rooms} />
            </div>
        )

    }

    render() {
        return (
            <div id="main-container" className="ui container">
                <h1>Welcome to Maccabi Chat</h1>
                <h2 className="text-right">By Omri.K</h2>
                {this.isLoggedIn() ?  this.renderChatRooms() : <div>In order to chat, you must first log in</div>}
            </div>
        )
    }
}



const mapStateToProps = (state) => ({user:state.user,rooms:state.rooms});
export default connect(mapStateToProps,{fetchRooms})(Main);
