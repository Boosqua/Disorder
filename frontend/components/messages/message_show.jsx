import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../reusable/icon_button'
import { deleteMessage } from "../../actions/message_actions"
import SlateUpdate from './slate_update'
import Modal from '../reusable/modal'

export default function MessageShow(props) {
   const dispatch = useDispatch()
   const userId = props.message.author_id
   const user = useSelector( state => state.entities.users[userId])
   const userImage = user.photo ? user.photo : [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][user.user_image]
   const userName = user.username
   const date = props.message.created_at ? props.message.created_at.split("-") : ""
   const [modal, setModal] = useState(false)
   const [currentUserId, channel] = useSelector( state => {
      const currentUserId = state.session.currentUser.id;
      const channel = state.actioncable.messages;
      return [currentUserId, channel]
   })
   useEffect(() => {
      if(props.message.photoUrl){
         const image = new Image();
         image.onload = () => {
            props.messagesEnd.current.scrollIntoView({ behavior: "auto" });
         }
         image.src = props.message.photoUrl
      }
   }, [])
   // slate

   const [editing, setEditing] = useState(false)


   return (
      <div className="msc" id={userId === currentUserId ? "hover" : ""}>
         {
            props.messageHeader ? 
            <div className="umid">
            <IconButton   height="35px" width="35px" image={userImage}/>
            </div> :
            null
         }
         
         <div className="umb">
            {
               props.messageHeader  ? 
               <div className="umih">
                  <div className="umun">
                     {userName}
                  </div>
                  <div className="date">
                     {`${date[1]}/${date[2][0]}${date[2][1]}/${date[0]}`}
                  </div>
               </div> :
            null
            }
            
            <div className="ummb">
               {
                  props.message.photoUrl ? 
                  null :
                     !editing ? 
                     (<div className="messagecontent"> 
                        {props.message.body} 
                     </div> )
                     :
                     (<div className="messagecontentedit"> 
                     <SlateUpdate text={props.message.body} id={props.message.id} setEditing={setEditing}/>
                     </div>)
               }
            
            {props.message.photoUrl ? 
            <div className="messagecontent" >
               <img className={"imageshow"}src={props.message.photoUrl} onClick={() => setModal(true)}/>
            </div>: null}
            {
            userId === currentUserId && !editing? 
            <div className="delete-row">
               <div className="delete-text" onClick={ () => { deleteMessage(props.message)(dispatch)}}>delete</div>
               <div className="delete-text" style={{fontStyle: "normal"}}>{" | "}</div>
               <div className="delete-text" onClick={() => {
               setEditing(true)
               }} >
               edit
            </div>
            
            </div>
            : null
            }
            </div>
         </div>
            {
               props.message.photoUrl ? 
               <Modal show={modal} closeModal={() => setModal(false)} background={true}>
                  <img className="imagepopout" src={props.message.photoUrl} alt=""/>
               </Modal>
               : null
            }
      </div>
   )
}