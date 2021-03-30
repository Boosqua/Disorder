import React from 'react';
import {Redirect} from 'react-router-dom'
export default class Splash extends React.Component {


   render() {
      let component = this.props.currentUser ?
         <Redirect to='/home' /> :
         <Redirect to='/login' />
      return (
         <div>
            {
               component
            }
         </div>
      )
   }
}