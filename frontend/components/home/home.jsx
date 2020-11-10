import React from 'react';
import ServersIndexContainer from '../servers/servers_index_container';
import ServersShowContainer from '../servers/server_show_container'
import MessageIndexContainer from '../messages/message_index_container'
import actionCable from 'actioncable'


export default class Home extends React.Component {
   constructor(props) {
      super(props)
      this.state = { loaded: false, currentChannelId: 1, currentMessages: [] }
      this.updateChannelId = this.updateChannelId.bind(this)
      this.cable = actionCable.createConsumer('ws://localhost:3000/cable')
   }
   componentDidMount() {
      // debugger
      this.props.fetchServers(this.props.user.id);
      this.props.fetchMessages(this.props.user.id)
      this.filterMessages(this.props.currentChannelId)
   }
   updateChannelId(id) {
      return () => {
         this.setState({
            currentChannelId: id, 
      })
         }
   }
   filterMessages(id){
      let messages = Object.values(this.props.messages).filter( message => {
         message.channelId === id;
      });
      this.setState({currentMessages: messages, currentChannelId: id})
   }
   render() {
      return Object.keys(this.props.servers).length > 0 ? (
         <div className='mount-component'>
            <ServersIndexContainer user={this.props.user} logout={this.props.logout}/>
            <ServersShowContainer user={this.props.user} updateChannelId={this.updateChannelId} 
            cable={this.cable}
            messages={this.currentMessages}/>
         </div>
      ) : null
   }
}
