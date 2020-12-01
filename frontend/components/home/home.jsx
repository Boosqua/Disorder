import React from 'react';
import ServersIndexContainer from '../servers/servers_index_container';
import ServersShowContainer from '../servers/server_show_container'
import MessageIndexContainer from '../messages/message_index_container'
import UserShowContainer from '../servers/users_show_container'
import actionCable from 'actioncable';
import Banner from './banner'


export default class Home extends React.Component {
   constructor(props) {
      super(props)
      this.state = { loaded: false, 
         currentChannelId: 1, 
         currentMessages: [], 
         currentServerId: this.props.currentServerId }
      this.updateChannelId = this.updateChannelId.bind(this)
      this.updateServerId = this.updateServerId.bind(this)
      this.cable = actionCable.createConsumer('ws://localhost:3000/cable' )
   }
   componentDidMount() {

      const that = this
      this.props.fetchServers(this.props.user.id)
         .then(() => this.props.fetchChannels(this.props.user.id))
         .then(() => this.props.fetchMessages(this.props.user.id))
         .then(() => this.props.fetchUsers())
         .then(() => that.setState({ loaded: true }))

   }
   updateChannelId(id) {
      return () => {
         this.setState({
            currentChannelId: id, 
         })
         console.log(this.state, id)
      }
   }

   updateServerId(id) {
      const channels = this.props.channels
      return () => {
         // debugger
         let channel = channels[id];
         this.setState({
            currentServerId: id,
            currentChannelId: channel[0].id
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
      return this.state.loaded ? (
         <div className='mount-component'>
            <ServersIndexContainer 
               user={this.props.user} 
               logout={this.props.logout}
               updateServerId={this.updateServerId}
               currentServerId={this.state.currentServerId}/>
            <ServersShowContainer 
               user={this.props.user} 
               server={this.props.servers[this.state.currentServerId]}
               updateChannelId={this.updateChannelId} 
               cable={this.cable}
               currentChannelId={this.state.currentChannelId}
               messages={this.state.currentMessages}/>
            <div className='server-messages-members'>
               <Banner />
               <div className='inside-smm'>
                  <MessageIndexContainer
                     cable={this.cable}
                     currentChannelId={this.state.currentChannelId}
                     />
                  <UserShowContainer />
               </div>
            </div>
         </div>
      ) : null
   }
}
