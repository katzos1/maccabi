import React from 'react'
import { Link } from "react-router-dom";

const HeaderUserStats = (props) => {

    return (
        <React.Fragment>
                  <span className="ui teal label"> {!props.isAdmin ? <span><i className="user icon"></i></span> : <span><i className="user secret icon"></i> <span  className="ui red ribbon label">Admin</span></span> } {props.nickName}</span>
                  <Link to="/logout" className="ui item">Logout</Link>
        </React.Fragment>
    )

};

export default HeaderUserStats;