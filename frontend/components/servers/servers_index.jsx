import React from 'react'
import { fetchServer } from '../../util/server_api_util';
// import { Link } from 'react-router-dom';
import ServerIndexItem from './server_index_item';
import LogoutButton from './logout_button'

export default class ServersIndex extends React.Component {
   constructor(props) {
      super(props)
   }
   render(){
      const { servers, user, fetchServer, currentServerId } = this.props

      const home = servers[0];
      const sharedServers = servers.slice(1)
      return(
         <div className='server-index-container'>
            <ul className='server-scroll-bar'>
               {
                  <ServerIndexItem 
                     key='home-page'
                     server={Object.assign({}, home, { image: window.homeIconURL})}
                     fetchServer={fetchServer}
                     fetchChannels={this.props.fetchChannels}
                     updateServerId={this.props.updateServerId}
                     userId={user.id}
                     currentServer={ currentServerId === home.id}
                     />
               }
            </ul>
            <div className='index-separator'/>
            <ul className='server-scroll-bar'>
               { sharedServers.map( server => (
                  <ServerIndexItem 
                     key={ server.id }
                     server={ server }
                     fetchChannels={this.props.fetchChannels}
                     updateServerId={this.props.updateServerId}
                     fetchServer={fetchServer}
                     userId={ user.id }
                     currentServer={ currentServerId === server.id }
                     />
                  ))
               }
            </ul>
            <div className='index-separator'/>
            <ul className='server-scroll-bar'>
               <LogoutButton logout={this.props.logout} />
            </ul>
         </div>
      )
   }
}