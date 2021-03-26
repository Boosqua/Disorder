import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import IconButton from '../reusable/icon_button'
import { Link, useParams } from 'react-router-dom';
import Modal from "../reusable/modal"
import { logout } from "../../actions/session_actions"
import { createServer } from "../../actions/server_actions"
export default function ServersIndex(props) {
      const dispatch = useDispatch()
      const [ showModal, setShowModal ] = useState(false)
      const [newServerName, setNewServerName] = useState("")
      const [position, setPosition] = useState(null)
      const servers = useSelector(state => Object.values(state.entities.servers))
      const userId = useSelector( state => state.session.currentUser.id )
      const { id } = useParams()
      function handleSubmit(e){
         e.preventDefault()
         const server = {name: newServerName }
         createServer(userId, server)(dispatch)
         setShowModal(false);
         setNewServerName("");
      }
      function modalContent() {
         return <div className="inputform">
               <div className="inputformrow">
               <div className="inputformsection"> {`Create a Server?`}
               </div>
               <form onSubmit={handleSubmit}>
               <input type="text" value={newServerName} onChange={(e) => setNewServerName(e.target.value)}/>
               </form>
               </div>
            </div>
      }
      const home = id === "@me" ? 
         <div className="sib">
               <IconButton
                  height={"60px"}
                  width={"60px"}
                  selected={id === "@me"}
                  onHover={id != "@me"}
                  link={id != "@me"}
                  image={window.homeIconURL}
                  />
            </div> : 
            <Link to='/server/@me' className="sib">
               <IconButton
                  height={"60px"}
                  width={"60px"}
                  selected={id === "@me"}
                  onHover={id != "@me"}
                  link={id != "@me"}
                  image={window.homeIconURL}
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
                           image={server.image}
                           text={server.name}
                           />
                     </div>
                  } else {
                     return <Link to={`/server/${server.id}`}className={"sib"} key={index}>
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