import React from 'react'
import { connect } from 'react-redux'
import { initPreProcess } from '../actions'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history';
import Main from './Main'
import Loading from './Loading'
import Login from './Auth/Login'
import Logout from './Auth/Logout'
import Register from './Auth/Register'
import Chat from './Chat/'
import Header from './Header/'
//Admin section
import UsersManagement from './Admin/UsersManagement'
import RoomsManagement from './Admin/RoomsManagement'


const App = (props) => {

    //hide some elments untill pre process finish its finish
    const isPreProcessFinish = props.preProcess;

    //make preProcess before showing components
    props.initPreProcess();
    return (
        <Router history={history}>
            <Header history={history} />
            {isPreProcessFinish ?
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path='/users' exact component={UsersManagement} />
                    <Route path='/rooms' exact component={RoomsManagement} />
                    <Route path='/chat/:id' exact component={Chat} />
                    <Route path="*" component={() => <div className="ui container"><h1>Page not found 404</h1></div>} />
                </Switch>
                : <Loading />
            }
        </Router>
    )
};

const mapStateToProps = (state) => ({ preProcess: state.preProcess });
export default connect(mapStateToProps, { initPreProcess })(App);
