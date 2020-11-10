import React from 'react';
import ChannelsIndex from '../channels/channels_index_container'
import MessageIndex from '../messages/message_index';

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
            <ChannelsIndex serverId={server.id} 
               updateChannelId={this.props.updateChannelId}/>
         </div>
         <MessageIndex
         cable={this.props.cable}
         messages={this.props.messages}

         />
         
      </div>)
   }
}
// add user to messages
