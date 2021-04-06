import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {Link} from "react-router-dom"
import IconButton from "./reusable/icon_button"
import Modal from "./reusable/modal"
import {receiveCurrentChannel} from "../actions/server_actions"
export default function ServerMembers(props){
   const serverId = parseInt(useParams().id)
   const [ownerId, channelSub] = useSelector( state => {
      const ownerId = state.entities.servers[serverId].owner_id;
      const channelSub = state.actioncable.friendRequestsChannel
      return [ownerId, channelSub]
   })
   const dispatch = useDispatch()
   const [modal, setModal] = useState({show: false, position: null, selectedUser: null })
   const [modalText, setModalText] = useState("")
   function getModalText() {
      switch (modalText) {
         case "SENT":
            return  <div className="inputformrow" style={{fontSize: "15px", alignSelf: "center", fontStyle: "italic"}}>
                        friend request sent
                     </div>
         default:
            return <div 
                  className="modalbutton" 
                  style={{alignSelf: "center"}} 
                  onClick={() => {
                     setModalText("SENT")
                     const friendRequest ={
                        requester_id: currentUserId,
                        receiver_id: modal.selectedUser.id,
                     }
                     channelSub.send(friendRequest)
                  }}
                  >
                     send friend request
                  </div>
      }
   }
   const ServerMembers = useSelector(state => {
      const ids = state.entities.servers[serverId].members
      let members = [];
      for( let i = 0; i < ids.length; i++ ){
         members.push(state.entities.users[ids[i]])
      }
      return members.sort( (a,b) => {
         let nameA = a.username.toUpperCase(); 
         let nameB = b.username.toUpperCase(); 
         if (nameA < nameB) {
            return -1;
         }
         if (nameA > nameB) {
            return 1;
         }
         return 0;
      })
   })
   const currentUserId = useSelector(state => state.session.currentUser.id)
   const friends = useSelector( state => {
      const friendships = Object.values(state.entities.friends);
      const id = state.session.currentUser.id;
      return friendships.map( friendship => friendship.friend_a_id === id ? 
         friendship.friend_b_id 
         : friendship.friend_a_id
      )
      
   })
   return (
      <div className="members">
         <div className="smh">
            {`MEMBERS - ${ServerMembers.length}`}
         </div>
         {
            ServerMembers.map( (member, index) => {
               const userImage = member.photo ? member.photo : [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][member.user_image]
               return (
               <div className="smc" key={index} onClick={(e) => { setModal({show:true, position:{x: e.clientX + 20, y: e.clientY }, selectedUser: member}) }}>
                  <div className="smci">
                  <IconButton height="30px" width="30px" image={userImage}/>
                  </div>
                  <div className={member.id === ownerId ? "smuno" : "smun"}>{member.username}</div>
                  {
                     member.id === ownerId ? 
                     <div className="title">
                        
                     </div>
                     : null
                  }
               </div>
         )
            })
         }
         <Modal 
         show={ modal.show } 
         closeModal={() => { 
            setModal({show: false})
            setModalText("")
         }} 
         position={modal.position}
         >
            {
               modal.selectedUser ? 
               (
                  <div className="inputform">
                     <div className="inputformrow" style={{fontSize: "20px", alignSelf: "center"}}>
                        {modal.selectedUser.username}
                     </div>
                     <div className="inputformrow" style={{alignSelf: "center"}}>

                     <IconButton height="50px" width="50px" image={modal.selectedUser.photo ? modal.selectedUser.photo : [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][modal.selectedUser.user_image]}/>
                     </div>
                     <br />
                     {
                        friends.indexOf(modal.selectedUser.id) === -1 && modal.selectedUser.id !== currentUserId ?
                           getModalText()
                           : modal.selectedUser.id !== currentUserId ? <Link to="/server/@me"className="modalbutton" onClick={() => {
                              dispatch(receiveCurrentChannel(modal.selectedUser.id))
                           }}>message</Link> : <Link to="/server/@me"className="modalbutton" onClick={() => {
                              dispatch(receiveCurrentChannel(null))
                           }}>Home Page</Link>

                     }
                  </div>
               ) :
               null
            }
         </Modal>
      </div>
   )
}