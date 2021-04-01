import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
   <Route
   path={path}
   exact={exact}
   render={ props =>
      !loggedIn  ?  <Component {...props} /> : <Redirect to="/server/@me" />
   }
   />
);

const Protected = ({ loggedIn, servers, match, path, component: Component }) => {

return (
   <Route 
      path={path}
      render={props =>{
         const id = props.match.params.id
         if( id!== "@me" && !servers[id] && loggedIn ){

            return <Redirect to="/servers/@me" />
         }
         return loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }}
   />
)}

const mapStateToProps = state => {
   return { loggedIn: Boolean(state.session.currentUser), servers: state.entities.servers };
};

export const AuthRoute = withRouter(
   connect(
      mapStateToProps,
      null
   )(Auth)
);


export const ProtectedRoute = withRouter(
   connect(
      mapStateToProps, 
      null
      )(Protected)
);