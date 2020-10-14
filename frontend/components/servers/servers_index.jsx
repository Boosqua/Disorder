import React from 'react'
// import { Link } from 'react-router-dom';
import ServerIndexItem from './server_index_item';

export default class ServersIndex extends React.Component {
   
   componentDidMount() {
      this.props.fetchServers()
   }

   render(){
      const { servers } = this.props
      return(
         <div className='server-index-container'>
            <div className='home-index'>HomePage</div>
            <div className='index-separator'/>
            <ul className='server-scroll-bar'>
               { servers.map( server => (
                  <ServerIndexItem 
                     key={ server.id }
                     server={ server }
                     />
                  ))
               }
            </ul>
         </div>
      )
   }
}