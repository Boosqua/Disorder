import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import IconButton from './reusable/icon_button'
import { Link, useParams } from 'react-router-dom';
import Modal from "./reusable/modal"
import { logout } from "../actions/session_actions"
import { createServer, receiveCurrentChannel } from "../actions/server_actions"
import { fetchChannels } from "../actions/channel_actions"
import { filterFriendIds } from "../actions/session_actions"
export default function ServersIndex(props) {
      const dispatch = useDispatch()
      const [ showModal, setShowModal ] = useState(false)
      const [newServerName, setNewServerName] = useState("")
      const [position, setPosition] = useState(null)
      const alert = useSelector(state => Object.values(state.entities.friendRequests).length > 0)
      const servers = useSelector(state => Object.values(state.entities.servers))
      const userId = useSelector( state => state.session.currentUser.id )
      const { id } = useParams()
      function handleSubmit(e){
         e.preventDefault()
         const server = {name: newServerName }
         createServer(userId, server)(dispatch)
            .then( () => {
               fetchChannels(1)(dispatch)
            })
         setShowModal(false);
         setNewServerName("");
      }
      const friendships = useSelector(state => state.entities.friends)
      useEffect( () => {
         filterFriendIds(userId, friendships)(dispatch)

      }, [])
      function modalContent() {
         return <div className="inputform">
               <div className="inputformrow">
               <div className="inputformsection"> {`Create a Server:`}
               </div>
               <form onSubmit={handleSubmit}>
               <input type="text" value={newServerName} onChange={(e) => setNewServerName(e.target.value)}/>
               </form>
               </div>
            </div>
      }

      const home = id === "@me" ? 
         <div className="sib" >
               <IconButton
                  height={"60px"}
                  width={"60px"}
                  selected={id === "@me"}
                  onHover={id != "@me"}
                  link={id != "@me"}
                  image={window.homeIconURL}
                  alert={alert}
                  />
            </div> : 
            <Link to='/server/@me' className="sib" onClick={ () => { dispatch(receiveCurrentChannel(null))}}>

               <IconButton
                  height={"60px"}
                  width={"60px"}
                  selected={id === "@me"}
                  onHover={id != "@me"}
                  link={id != "@me"}
                  image={window.homeIconURL}
                  alert={alert}
                  />
            </Link> 
      return(
         <div className='sic'>
            {home}
         <div className="sbl"/>
            {
               servers.map( (server, index) => {
                  if( server.id === parseInt(id) ) {
                     return <div className="sib" key={index}>
                        <IconButton
                           height={"60px"}
                           width={"60px"}
                           selected={"true"}
                           image={server.photoUrl}
                           text={server.name}
                           serverPhoto={Boolean(server.photoUrl)}
                           />
                     </div>
                  } else {
                     return <Link to={`/server/${server.id}`}className={"sib"} key={index}>
                        <IconButton
                           height={"60px"}
                           width={"60px"}
                           link={"true"}
                           onHover={"true"}
                           image={server.photoUrl}
                           text={server.name}
                           serverPhoto={Boolean(server.photoUrl)}
                           />
                     </Link>
                  }
               })
            }
            <div className="sbl"/> 
            <div className="sib" onClick={ (e) => {
               setPosition({x: e.clientX, y: e.clientY})
               setShowModal(true)
            }
            }>
               <IconButton
                  height={"60px"}
                  width={"60px"}
                  link={"true"}
                  onHover={"true"}
                  image={window.plus}
                  />
            </div>
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
               <Modal position={position} show={showModal} closeModal={() => setShowModal(false)}> {modalContent()} </Modal>
         </div>
      )
   
}