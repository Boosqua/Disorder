import React from 'react'
import {useSelector} from 'react-redux'
import IconButton from '../reusable/icon_button'
import { fetchServer } from '../../util/server_api_util';
import { Link, useParams, useRouteMatch} from 'react-router-dom';
import ServerIndexItem from './server_index_item';
import LogoutButton from './logout_button'

export default function ServersIndex(props) {



      const servers = useSelector(state => Object.values(state.entities.servers))
      const { id } = useParams()
      return(
         <div className='sic'>
            <IconButton height={"50px"} link={"true"} onHover={"true"}
            text="hehe"
            />
            {
               servers.map( (server, index) => {
                  if( server.id === parseInt(id) ) {
                     return <div className="sib" key={index}>
                        <IconButton
                           height={"60px"}
                           width={"60px"}
                           selected={"true"}
                           image={server.image}
                           text={server.name}
                           />
                     </div>
                  } else {
                     return <Link to={`/channels/${server.id}`}className={"sib"} key={index}>
                        <IconButton
                           height={"60px"}
                           width={"60px"}
                           link={"true"}
                           onHover={"true"}
                           image={server.image}
                           text={server.name}
                           />
                     </Link>
                  }
               })
            }
         </div>
      )
   
}