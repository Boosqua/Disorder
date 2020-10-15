import React from 'react';
import ChannelsIndexItem from './channels_index_item'

export default class ChannelsIndex extends React.Component {
   constructor(props) {
      super(props)
   }
   componentDidMount() {
      this.props.fetchChannels(this.props.serverId)
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
                        channel={channel}/>
                  )) : null
               }
            </ul>
         </div>
      )
   }
}
