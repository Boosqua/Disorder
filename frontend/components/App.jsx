import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import Home from "./home"
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import Testing from './testing';

const App = () => (
   <Switch>
      <Route exact path="/testing" component={Testing} />
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <ProtectedRoute main path="/server/:id" component={Home} />
      <AuthRoute path="/:id" component={LoginFormContainer}/>
      <AuthRoute path="/" component={LoginFormContainer}/>
   </Switch>
)

export default App;