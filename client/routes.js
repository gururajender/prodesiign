import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom';
import App from './Components/App';
import Greetings from './Components/Greetings';
import SignupPage from './Components/Signup/SignupPage';
import LoginPage from './Components/Login/LoginPage';
import NewEventPage from './Components/Events/NewEventPage';
import MyProfilePage from './Components/MyProfile/MyProfilePage';
import requireAuth from './utils/requireAuth';


export default class Root extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <App>
            <Route exact path="/" component={Greetings}/>
            <Route path="/signup" component={SignupPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/new-event" component={requireAuth(NewEventPage)}/>
            <Route path="/myprofile" component={requireAuth(MyProfilePage)}/>
          </App>
        </Switch>
     </Router>
    );
  }
}
