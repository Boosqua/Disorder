import React from 'react';
import ChannelsIndex from '../channels/channels_index_container'
import MessageIndexContainer from '../messages/message_index_container';
import UsersShowContainer from './users_show_container'
export default class ServersShow extends React.Component {
   constructor(props) {
      super(props),
      this.state = { modal: false }
      this.triggerModal = this.triggerModal.bind(this)
   }

   triggerModal() {
      // console.log(this.state.modal)
      let oldModal = this.state.modal
      this.setState({ modal: !oldModal })
   }

   render() {
      const { server, userId } = this.props
      return (<div className="server-show-outside">
         <div 
            className='server-header-container'
            onClick={this.triggerModal}
            >
            <div className='server-header'>
            {server.name}
            </div>
         </div>
         <div className='index-separator'/>
         <div>
            <ChannelsIndex currentServerId={server.id} 
               updateChannelId={this.props.updateChannelId}/>
         </div>
         {/* <UsersShowContainer /> */}
      </div>)
   }
}
// add user to messages
