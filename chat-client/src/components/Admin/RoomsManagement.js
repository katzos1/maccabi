import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchRooms,doCreateRoom } from "../../actions";
import Room from '../Chat/Room';
import CreateRoom from "./CreateRoom";
import "./RoomManagement.css";

const RoomsManagement = (props) => {
    const { rooms,user } = props;

    const renderRooms = () => {
        if (!rooms) return null;
        return (
            <div>
                {rooms.map(room => {
                    return <Room key={room._id} {...room} />
                })}
            </div>
        );
    };


    const onCreateRoom = (roomName) =>{
        if (!roomName) window.alert('Please enter room name');      
        else props.doCreateRoom(user.token,roomName);
    }

    //Load Rooms
    useEffect(() => {
        const { user, history } = props;

        //make administrator validation
        if (!user.isLoggedIn) history.push('/login');
        else if (!user.isAdmin) history.push('/');

        props.fetchRooms();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <div id="room-managment" className="ui container">
            <h1>Rooms Managment</h1>
            {renderRooms()}
            <div style={{clear:'both'}}></div>
            <hr  />
            <CreateRoom  onCreateRoom={onCreateRoom} />
        </div>
    );
};


const mapStateToProps = (state) => ({ user: state.user, rooms: state.rooms });
export default connect(mapStateToProps, { fetchRooms,doCreateRoom })(RoomsManagement);