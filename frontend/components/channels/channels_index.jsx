import React from 'react';
import ChannelsIndexItem from './channels_index_item'
import MessageIndexContainer from '../messages/message_index_container'
export default class ChannelsIndex extends React.Component {
   constructor(props) {
      super(props)
      this.state = { currentChannelId: props.channels[0] }
      this.changeCurrentChannel = this.changeCurrentChannel.bind(this)
   }
   componentDidMount() {
      // this.props.fetchChannels(this.props.serverId)
      this.setState({ currentChannelId: this.props.channels[0] })
   }
   changeCurrentChannel(id) {
      return () => {
         // console.log(id)
         this.setState({currentChannelId: id})
      }
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
                        changeCurrentChannel={
                           this.changeCurrentChannel(channel.id)
                        }
                        />
                  )) : null
               }
            </ul>
            <MessageIndexContainer 
               currentChannelId={this.state.currentChannelId}
               />
         </div>
      )
   }
}
