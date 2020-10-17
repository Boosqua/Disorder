import React from 'react';
import ServersIndexContainer from '../servers/servers_index_container';
import ServersShowContainer from '../servers/server_show_container'
import MessageIndexContainer from '../messages/message_index_container'
export default class Home extends React.Component {
   constructor(props) {
      super(props)
      this.state = { loaded: false, currentChannelId: null }
      this.updateChannelId = this.updateChannelId.bind(this)
   }
   componentDidMount() {
      // debugger
      this.props.fetchServers(this.props.user.id);
   }
   updateChannelId(id) {
      return () => this.setState({currentChannelId: id})
   }
   render() {
      return Object.keys(this.props.servers).length > 0 ? (
         <div className='mount-component'>
            <ServersIndexContainer user={this.props.user} logout={this.props.logout}/>
            <ServersShowContainer user={this.props.user} updateChannelId={this.updateChannelId} />
            {
               this.state.currentChannelId ?
                  <MessageIndexContainer 
                  currentChannelId={this.state.currentChannelId}
                  /> : ''
            }
         </div>
      ) : null
   }
}
