import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import IconButton from '../reusable/icon_button'
import { Link, useParams } from 'react-router-dom';
import { logout } from "../../actions/session_actions"

export default function ServersIndex(props) {
      const dispatch = useDispatch()
      const servers = useSelector(state => Object.values(state.entities.servers))
      const { id } = useParams()
      return(
         <div className='sic'>
         <div className="sbl"/>
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
            <div className="sbl"/> 
            <div
               className="sib"
               onClick={() => {logout()(dispatch)}}
               >
               <IconButton
                  height={"60px"}
                  width={"60px"}
                  link={"true"}
                  onHover={"true"}
                  image={window.logoutUrl}
                  />
               </div>
         </div>
      )
   
}