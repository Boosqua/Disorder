import React from 'react';
import ChannelsIndex from '../channels/channels_index_container'

export default class ServersShow extends React.Component {

   render() {
      const { server, userId } = this.props
      return (<div className="server-show-outside">
         <div>
            {server.name}
         </div>
         <div>
            <ChannelsIndex serverId={server.id}/>
         </div>
      </div>)
   }
}
