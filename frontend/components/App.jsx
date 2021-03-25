import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container'
import SignupFormContainer from './session/signup_form_container'
// import HomeContainer from './home/home_container'
import Home from "./home"
import {AuthRoute, ProtectedRoute} from '../util/route_util'
import SplashContainer from './splash/splash_container';
import Testing from './testing';

const App = () => (
   <Switch>
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <ProtectedRoute main path="/server/:id" component={Home} />
      <AuthRoute path="/:id" component={Testing}/>
      <AuthRoute path="/" component={Testing}/>
   </Switch>
)

export default App;