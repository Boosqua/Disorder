import React from 'react';
import ChannelsIndexItem from './channels_index_item'
import MessageIndexContainer from '../messages/message_index_container'
export default class ChannelsIndex extends React.Component {
   constructor(props) {
      super(props)
      this.state = { currentChannelId: props.channels[0] }

   }
   componentDidMount() {
      // this.props.fetchChannels(this.props.serverId)
      // this.setState({ currentChannelId: this.props.channels[0] })
   }

   render(){

      const { channels } = this.props 
      // debugger
      return(
         <div>
            <ul>
               {  channels ? 
                  channels.map( channel => (
                     <ChannelsIndexItem 
                        key={channel.id}
                        channel={channel}
                        updateChannelId={
                           this.props.updateChannelId(channel.id)
                        }
                        />
                  )) : null
               }
            </ul>
         </div>
      )
   }
}
