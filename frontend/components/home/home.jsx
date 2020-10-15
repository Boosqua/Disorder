import React from 'react';
import ServersIndexContainer from '../servers/servers_index_container';
import ServersShowContainer from '../servers/server_show_container'

export default class Home extends React.Component {
   constructor(props) {
      super(props)
      this.state = { loaded: false }
   }
   componentDidMount() {
      // debugger
      this.props.fetchServers(this.props.user.id)
   }

   render() {
      return Object.keys(this.props.servers).length > 0 ? (
         <div className='mount-component'>
            <ServersIndexContainer user={this.props.user} logout={this.props.logout}/>
            <ServersShowContainer user={this.props.user} />
         </div>
      ) : null
   }
}
