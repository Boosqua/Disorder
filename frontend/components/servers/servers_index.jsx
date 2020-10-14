import React from 'react'
import { fetchServer } from '../../util/server_api_util';
// import { Link } from 'react-router-dom';
import ServerIndexItem from './server_index_item';

export default class ServersIndex extends React.Component {
   
   // componentDidMount() {
   //    this.props.fetchServers()
   // }

   render(){
      const { servers, user, fetchServer } = this.props
      return(
         <div className='server-index-container'>
            <ul className='server-scroll-bar'>
               {
                  <ServerIndexItem 
                     key='home-page'
                     server={{
                        name: user.username,
                        id: 1,
                        image: window.homeIconURL,
                        owner_id: user.id
                     }}
                     fetchServer={ fetchServer }
                     userId={user.id}
                     />
               }
            </ul>
            <div className='index-separator'/>
            <ul className='server-scroll-bar'>
               { servers.map( server => (
                  <ServerIndexItem 
                     key={ server.id }
                     server={ server }
                     fetchServer={ fetchServer }
                     userId={ user.id }
                     />
                  ))
               }
            </ul>
         </div>
      )
   }
}