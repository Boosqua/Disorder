import React from 'react';
import ChannelsIndexItem from './channels_index_item'
import MessageIndexContainer from '../messages/message_index_container'
export default class ChannelsIndex extends React.Component {
   constructor(props) {
      super(props)
      // this.state = { currentChannelId: props.channels[0] }

   }

   render(){

      const { allChannels } = this.props 
      const channels = allChannels[this.props.currentServerId]
      

      return(
         <div className="all-channels">
            <div className='text-channel-header'>
               TEXT CHANNELS
            </div>
            <div className='index-separator-new'/>
            <ul>
               {  channels ? 
                  channels.map( channel => (
                     <ChannelsIndexItem 
                        key={channel.id}
                        channel={channel}
                        updateChannelId={
                           this.props.updateChannelId
                        }
                        />
                  )) : null
               }
            </ul>
         </div>
      )
   }
}
