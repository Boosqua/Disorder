import React from 'react';
// import { Link } from 'react-router-dom';
export default class ServersShow extends React.Component {

   render() {
      // debugger
      return this.props.server.name ? (
         <div>{ this.props.server.name }</div>
      ) : (<div></div>)
   }
}
