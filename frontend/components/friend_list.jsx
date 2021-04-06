import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "./reusable/icon_button"
import Modal from "./reusable/modal"
import {destroyFriend, destroyFriendRequest} from "../actions/friend_actions"
import { receiveCurrentChannel } from "../actions/server_actions";
import Invites from "./invites"
import { createServerMember } from "../util/server_api_util";
import { fetchServer } from "../actions/server_actions"
import { fetchChannels } from "../actions/channel_actions"
import { receiveUser } from "../actions/user_actions"
import { destroyInvite } from "../actions/invitation_actions"

export default function FriendList(props) {
   const defaultInvite = {server: null, sender: null}
   const dispatch = useDispatch()
   const [inviteModal, setInviteModal] = useState(false)
   const [invite, setInvite] = useState(defaultInvite)
   const [friends, channel, invites, userId] = useSelector( state => {
      const friendships = Object.values(state.entities.friends).sort((a,b) => {
         let timeA = a.last_message; 
         let timeB = b.last_message; 
         if (timeA > timeB) {
            return -1;
         }
         if (timeA < timeB) {
            return 1;
         }
         return 0;
      })
      const id = state.session.currentUser.id;
      let friends = friendships.map( friendship => {
         let friendId = friendship.friend_a_id === id ? 
         friendship.friend_b_id 
         : friendship.friend_a_id
         let friend = state.entities.users[friendId];
         friend.friendshipId = friendship.id
         return friend
      })
      const channel = state.actioncable.friendChannel;
      const invites = Object.values(state.entities.invitations)
      const userId = state.session.currentUser.id
      return [friends, channel, invites, userId]
   })
   if( !useSelector( state => state.session.channelId ) && friends.length > 0){
      dispatch(receiveCurrentChannel(friends[0].id))
   }
   const selectedId = useSelector( state => state.session.channelId )
   const [modal, setModal] = useState({show: false, position: null, selectedUser: null })
   const friendRequestors = useSelector( state => {
      const requests = Object.values(state.entities.friendRequests)
      return requests.map( request => {
         return Object.assign({requestId: request.id}, state.entities.users[request.requestor_id])
      })
   })
   function handleInvite(invite) {
      const {sender, server} = invite
      return (type) => {
         const membership = { server_id: server.id, user_id: userId}
         return () => {
            if(type === "accept"){
               createServerMember(membership)
               .then( () => {
                  fetchServer(userId, server.id)(dispatch)
                  fetchChannels(userId)(dispatch)
                  dispatch(receiveUser(sender))
               })
            }
            destroyInvite(invite.id)(dispatch)
            setInviteModal(false)
            setInvite(defaultInvite)
         }
      }
   }
   const id = useSelector(state => state.session.currentUser.id)
   return (
      <div className="server">
         {
            friendRequestors.length > 0 ?
            (
               <div style={{maxHeight: "300px", overflow: "scroll"}}>
                  <div className="smh">
                     {`FRIEND REQUESTS - ${friendRequestors.length}`}
                  </div>
                  {friendRequestors.map( (friend, index) => {
                     const userImage = friend.photo ? friend.photo : [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][friend.user_image]
                     return (
                        <div className="smc2" key={index} onClick={(e) => {
                           e.preventDefault()
                           setModal({show:true, position:{x: e.clientX + 20, y: e.clientY }, selectedUser: friend})
                        }}>
                           <div className="smci">
                           <IconButton height="30px" width="30px" image={userImage}/>
                           </div>
                           <div className={"smun"}>{friend.username}</div>
                        </div>
                        )
                      })}
               </div>
            ): null  
         }
         {
            invites.length > 0 ?
            (
               <div style={{maxHeight: "300px", overflow: "scroll"}}>
                  <div className="smh">
                     {`SERVER INVITES - ${invites.length}`}
                  </div>
                  {invites.map( (invited, index) => {
                     const image =  invited.server.photoUrl ? invited.server.photoUrl : null
                     return (
                        <div className="smc2" key={index} onClick={(e) => {
                           e.preventDefault()
                           setInviteModal(true)
                           setInvite(invited)
                        }}>
                           {
                              image ? 
                                 <div className="smci">
                                 <IconButton height="30px" width="30px" image={image} />
                                 </div> 
                                 : null
                           }
                           <div className={"smun"}>{invited.server.name}</div>
                        </div>
                        )
                     })}
                     <Invites handle={handleInvite(invite)} handle1={handleInvite(invite)}invite={invite} show={inviteModal} close={ () => setInviteModal(false) }/>
               </div>
            ): null  
         }
         
         <div className="smh">
            {`FRIENDS - ${friends.length}`}
         </div>
         {friends.map( (friend, index) => {
            const userImage = friend.photo ? friend.photo : [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][friend.user_image]
               return (
               <div className={selectedId === friend.id ? "smc2s" : "smc2"} key={index}  onContextMenu={(e) => {
                  e.preventDefault()
                  setModal({show:true, position:{x: e.clientX + 20, y: e.clientY }, selectedUser: friend})
               }}
               onClick={() => {
                  if( selectedId !== friend.id ){
                     dispatch(receiveCurrentChannel(friend.id))
                  }
               }}>
                  <div className="smci">
                  <IconButton height="30px" width="30px" image={userImage}/>
                  </div>
                  <div className={"smun"}>{friend.username}</div>
               </div>
            )
         })}
         <Modal 
         show={ modal.show } 
         closeModal={() => { setModal({show: false})}} 
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
                        modal.selectedUser.requestId ?
                        <div className="modalbuttonrow">
                           <div className="modalbutton" style={{alignSelf: "center"}} onClick={ (e) => {
                              destroyFriendRequest(modal.selectedUser.requestId)(dispatch)
                              channel.send({friendAId: modal.selectedUser.id, friendBId: id})
                              setModal({show: false, position: null, selectedUser: null })
                           }}>
                           Accept
                           </div>
                           <div className="modalbutton" style={{alignSelf: "center"}} onClick={ (e) => {
                              destroyFriendRequest(modal.selectedUser.requestId)(dispatch)
                              setModal({show: false, position: null, selectedUser: null })
                           }}>
                           Decline
                           </div>
                        </div> 
                        :
                        <div className="modalbutton" style={{alignSelf: "center"}} onClick={ (e) => {
                           destroyFriend(modal.selectedUser.friendshipId)(dispatch).then(() => {
                              dispatch(receiveCurrentChannel(null))
                           })
                           props.setChannelChange(Math.random())
                           setModal({show: false, position: null, selectedUser: null })
                        }}>
                           Remove Friend
                        </div>
                     }
                  </div>
               ) :
               null
            }
         </Modal>

      </div>
   )
}