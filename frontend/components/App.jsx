import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
import HomeContainer from './home/home_container'
import {AuthRoute, ProtectedRoute} from '../util/route_util'
const App = () => (
   <Switch>
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      {/* <AuthRoute path='/' /> */}
      <ProtectedRoute main path="/home" component={HomeContainer} />
   </Switch>
)

export default App;