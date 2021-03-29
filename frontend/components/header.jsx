import React, {useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router"
import {Link} from "react-router-dom"
import {deleteServerMember, updateServer, deleteServer} from "../actions/server_actions"

import Modal from "./reusable/modal"
export default function Header(props){
   const {id} = useParams()
   const dispatch = useDispatch()
   const [serverModal, setServerModal] = useState(false)
   const [nestedModal, setNestedModal] = useState(false)
   const [nestedModalType, setNestedModalType] = useState("")
   const [modalPos, setModalPos] = useState(null)
   const [nestedPos, setNestedPos] = useState(null)
   
   const userId = useSelector(state => state.session.currentUser.id)
   const server = useSelector((state) => {
      if(id === "@me") {
         return state.session.currentUser.username
      } else {
         return state.entities.servers[id]
      }
   })
   
   const pageName = server.name ? server.name : server
   const [newServerName, setNewServerName] = useState(pageName)
   const ownedServer = useSelector(state => state.session.currentUser.id) === server.owner_id
   function nestedContent() {
      switch (nestedModalType) {
         case "CHANGE_CHANNEL_NAME":
            return (<div className="inputform">
                     <div className="inputformrow">
                        <form 
                           onSubmit={(e)=> {
                              e.preventDefault()
                              let updatedServer = Object.assign(server,{name: newServerName})
                              updateServer(updatedServer.owner_id, updatedServer)(dispatch)
                              setNewServerName("")
                              setNestedModal(false)
                              setServerModal(false)
                           }}>
                           <input
                              type="text" 
                              value={newServerName} 
                              onChange={(e) => {
                                 setNewServerName(e.target.value)
                              }}/>
                        </form>
                     </div>
                  </div>)
         case "DELETE_SERVER":
            return (
               <div className="inputform">
               <div className="inputformrow">
               <div className="inputformsection"> {`Are you sure you want to delete ${pageName}?`}
               </div>
               <Link to='/server/@me'>
               <div className="modalbutton" onClick={(e) => {
                  deleteServer(userId, parseInt(id))(dispatch)
                  setNestedModal(false)
                  setServerModal(false)
                  setNestedModalType("")
               }}>confirm</div>
               </Link>
               <Link>
               <div className="modalbutton" onClick={() => {
                  setNestedModal(false) 
                  }}>
                     cancel
                  </div>
               </Link> 
               </div>
            </div>
            )
         default:
            return null;
      }
   }
   function modalContent() {
      if(ownedServer){
         return (
            <div className="inputform">
               <div className="inputformrow" onClick={(e)=> {
                  setNestedPos({x: e.clientX, y: e.clientY})
                  setNestedModalType('CHANGE_CHANNEL_NAME')
                  setNestedModal(true)
               }}>
                  <div className="inputformsection" id="highlight">
                     Change Channel Name
                  </div>
               </div>
               <div className="inputformrow"
                  onClick={(e)=> {
                     alert('Feature not ready')
                  }}>
                     <div className="inputformsection" id="highlight">
                        Update Server Image
                     </div>
               </div>
               {
                  server.image || true?
                  <div className="inputformrow"
                  onClick={(e)=> {
                     alert('Feature not ready')
                  }}>
                     <div className="inputformsection" id="highlight" style={{color: "red"}}>
                        Delete Server Image
                     </div>
               </div> :
               null
               }
               <div className="inputformrow"
                  onClick={(e)=> {
                  setNestedPos({x: e.clientX, y: e.clientY})
                  setNestedModalType('DELETE_SERVER')
                  setNestedModal(true)
               }}>
                     <div className="inputformsection" id="highlight" style={{color: "red"}}>
                        {`Delete ${pageName}`}
                     </div>
               </div>
               <Modal 
               show={nestedModal} 
               closeModal={() => {
                  setNestedModal(false)
                  setNewServerName("")
                  setNestedModalType("")
               }} 
               position={nestedPos}>
                  {nestedContent()}
               </Modal>
            </div>
         )
      } else {
         return  (
            <div className="inputform">
               <div className="inputformrow">
               <div className="inputformsection"> {`Leave ${pageName}?`}
               </div>
               <Link to='/server/@me'>
               <div className="modalbutton" onClick={(e) => {
                  deleteServerMember({server_id: parseInt(id)})(dispatch)
                  setServerModal(false)
               }}>confirm</div>
               </Link>
               <Link>
               <div className="modalbutton" onClick={() => setServerModal(false) }>cancel</div>
               </Link> 
               </div>
            </div>
         )
      }
   }
   const channelName = useSelector( (state) => {
      if( id=== "@me") {
         return ""
      } 
      let channels = state.entities.channels[id]
      for( let i = 0; i < channels.length; i++ ){
         if(channels[i].id === state.session.channelId){
            return channels[i].name
         }
      }
   })
   return (
      <div className="header">
         <Modal show={serverModal} closeModal={() => { setServerModal(false)}} position={modalPos} >
            {modalContent()}
         </Modal>
         <div className="ht" onClick={ (e) => {
            if (id === "@me") return
            setModalPos({x: e.clientX, y: e.clientY})
            setServerModal(true)
         }}>
            <div className="htt">
            {pageName}
            </div>
         </div>
         <div className="hc">
            <div className="httt">
            {channelName}
            </div>
         </div>
      </div>
   )
}