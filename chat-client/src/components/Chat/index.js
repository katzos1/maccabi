import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchChat, addMessageToChat, updateStatusMessage } from '../../actions'
import Loading from "../Loading";
import SendMessage from './SendMessage';
import ChatMessages from './ChatMessages';

import "./chat.css";
import { io } from "socket.io-client";
let socket = {}; // init object later

const Chat = (props) => {

    const [connectionStatus,setConnectionStatus] = useState(0);
    const { chat, user, history, match } = props;

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

    //callback-> submit yout message
    const onSendMessageSubmit = (message) => {

        if(connectionStatus!==1){
            alert('Your not connected to the server, please wait of refresh the page');
            return;
        }

        //validate message
        if (!message) {
            alert('Please enter message');
            return;
        }

        if (message.length>500) {
            alert('message max size: 500');
            return;
        }

        //send message object
        const messageObject = {
            statusMessage:0, // one V
            message,
            messageId: uuidv4(),
            userId: user._id,
            nickName: user.nickName,
            sentTime: new Date().toDateString()
        };

        //send socket to the server
        socket.emit('message', messageObject);


        //update redux
        props.addMessageToChat(messageObject);
    };

    //this use effect just if user logged in + fetch chat details from redux
      useEffect(() => {

        //check if user logged in
        if (!user.isLoggedIn) history.push('/login');
        
         //get chat for the first time
        props.fetchChat(match.params.id);
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    
    //listen to socket io events
    useEffect(() => {
        console.log('useEffect','socket.IO','render');
        //if roomId not exist yet, we don't init connection
        if (!chat.roomId) {
            return;
        }

        //check if any connection open
        if (!_.isEmpty(socket)){
            console.log('connection already open');
            socket.close();
        }

        //connect to socket io
         socket = io.connect(`http://localhost:8080/?roomId=${chat.roomId}&userToken=${user.token}`);


        //event-> server/user got your message
        socket.on("updateMessageStatus", data => {
            props.updateStatusMessage(data);
        });

        //event-> message arrived
        socket.on("message", data => {
            props.addMessageToChat(data);
        });

        socket.on('connect',()=>{
            setConnectionStatus(1);
        });


        socket.on('disconnect',()=>{
            setConnectionStatus(2);
        });
       // eslint-disable-next-line react-hooks/exhaustive-deps
      },[chat.roomId]);


    if (chat.errorMessage) return <div className="ui container"><h2>{chat.errorMessage}</h2></div>
    if (!chat.roomId) return <Loading text='Loading Chat, please wait' />
 
    const renderSocketStatus = () => {
        if (connectionStatus==0) return <span>Connecting to server</span>;
        else if (connectionStatus==1) return <span style={{color:'green'}}>Connected</span>;
        else return <span style={{color:'red'}}>Disconnected</span>;

    };

    const RenderChatRoom = () => {
        return (
            <div id="chat-container" className="ui container">
                <h2>Room: {chat.name} | {renderSocketStatus()}</h2>

                <ChatMessages myUserId={user._id} messages={chat.chats} />
                <SendMessage onSendMessage={onSendMessageSubmit} />
                <hr />
            </div>
        );

    };
    return RenderChatRoom();
}



const mapStateToProps = (state) => {
    return {
        user: state.user,
        chat: state.chat
    }
};
export default connect(mapStateToProps, { fetchChat, addMessageToChat,updateStatusMessage })(Chat);