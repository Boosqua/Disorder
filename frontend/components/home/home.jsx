import React from 'react';
import ServersIndexContainer from '../servers/servers_index_container';
export default class Home extends React.Component {
   componentDidMount() {
      this.props.fetchUser(this.props.user.id)
   }

   render() {
      return (
         <div className='mount-component'>
            <button 
               onClick={this.props.logout} 
               className='logout-button'>
               Log out
            </button>
            <ServersIndexContainer />
         </div>
      )
   }
}