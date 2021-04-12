import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers, doDeleteUser } from "../../actions";
import Search from "./Search";
import Button from "../../form-components/Button";
import User from './User';
import "./UserManagement.css";
import _ from 'lodash';


class UsersManagement extends React.Component {

    state = { query: '' };
    componentDidMount() {
        const { history, user, fetchUsers } = this.props;

        if (!user.isLoggedIn) history.push('/login');
        else if (!user.isAdmin) history.push('/');

        //fetch users
        fetchUsers(user.token);
    }

    onSearchChange = (e) => {
        const value = e.target.value;
        this.setState({ query: value });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          this.onSearchSubmit();
        }
    }


    onSearchSubmit = () => {

        if (_.isEmpty(this.state.query))
        {
            this.props.fetchUsers(this.props.user.token);
            return;
        }
        const query = {
           'userName': {$regex: `${this.state.query}`}
        } 
        
        this.props.fetchUsers(this.props.user.token,query);
    };

    onDeleteCallback = (_id) => {
        const { user, doDeleteUser } = this.props;
        doDeleteUser(user.token,_id);
        this.setState({query:''});
    }

    renderUsersList = () => {
        const { usersManagment, user } = this.props;

        console.log('renderUsersList', usersManagment);
        if (!usersManagment) return null;
        return (
            <ul>
                {usersManagment.map((u) => {
                    //dont show myself
                    if (u._id===user._id) return null;

                    //return user details
                    return <User key={u._id} onDeleteCallback={this.onDeleteCallback} {...u} />
                })}
            </ul>
        )

    }
    render() {
        return (
            <div id="user-managment" className="ui container">
                <h1>Users Managment</h1>
                <div className="search-container">
                    <Search onKeyDown={this.handleKeyDown} value={this.state.query} onChange={this.onSearchChange} />
                 </div>
                <Button className="ui button search-button" onClick={this.onSearchSubmit}>Search</Button>
                <hr />
                {this.renderUsersList()}

            </div>
        );

    }

};


const mapStateToProps = (state) => ({ user: state.user, usersManagment: state.usersManagment });
export default connect(mapStateToProps, { fetchUsers,doDeleteUser })(UsersManagement);