import React, { useState } from "react"
import Modal from "./reusable/modal"
import IconButton from "./reusable/icon_button"
import { useDispatch, useSelector } from "react-redux"

export default function Invites({invite, show, close, handle, handle1}) {
   const userId = useSelector(state => state.session.currentUser.id)
   const dispatch = useDispatch()
   const {server, sender} = invite
   const image = server && server.photoUrl ? server.photoUrl : null
   const photo = sender ? sender.photo ? sender.photo : [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][sender.user_image] : null
   return (
      show ? 
      <Modal show={show} closeModal={close}>
         <div className="icc">
            <div className="centerthecenter">
               <div className="inviteTitleContainer">
               <div className="inviteTitle">
                  Server Invite To
               </div>
            </div>
            </div>
            <div className="usercrudunb">
               <div className="usercrudbi">
                  <IconButton image={image} text={server.name}width={"50px"} height={"50px"}/>
               </div>
               <div className="usercrudbi">{server.name}</div>
            </div>
            <div className="centerthecenter">
               <div className="inviteTitleContainer">
               <div className="inviteTitle">
                  Sent By
               </div>
            </div>
            </div>
            <div className="usercrudunb">
               <div className="usercrudbi">
                  <IconButton image={photo} width={"50px"} height={"50px"}/>
               </div>
               <div className="usercrudbi">{sender.username}</div>
            </div>
            <div className="rowtherow">
            <div className="usercrudbutton" onClick={ handle("accept") }>Accept</div>
            <div className="usercrudbutton" onClick={ handle1("")}>Decline</div>
            </div>
         </div>
      </Modal>
      : null
   )
}