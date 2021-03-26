import React, {useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from "react-router"
import Modal from "./reusable/modal"
export default function Header(props){
   const {id} = useParams()
   const [serverModal, setServerModal] = useState(false)
   const [modalPos, setModalPos] = useState(null)
   const server = useSelector((state) => {
      if(id === "@me") {
         return state.session.currentUser.username
      } else {
         return state.entities.servers[id]
      }
   })
   const pageName = server.name
   const ownedServer = useSelector(state => state.session.currentUser.id) === server.owner_id
   function modalContent() {
      if(ownedServer){
         return (
            <div>
               you own this server!
            </div>
         )
      } else {
         return  (
            <div className="inputform">
               <div className="inputformrow">
               <div className="inputformsection"> {`Leave ${pageName}?`}
               </div>
               <div className="modalbutton" onClick={(e) => e.preventDefault}>confirm</div>
               <div className="modalbutton" onClick={(e) => e.preventDefault}>cancel</div>
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