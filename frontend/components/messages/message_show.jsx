import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../reusable/icon_button'
import { deleteMessage } from "../../actions/message_actions"
import SlateUpdate from './slate_update'

export default function MessageShow(props) {
   const dispatch = useDispatch()
   const userId = props.message.author_id
   const user = useSelector( state => state.entities.users[userId])
   const userImage = user.photo ? user.photo : [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][user.user_image]
   const userName = user.username
   const date = props.message.created_at ? props.message.created_at.split("-") : ""
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
                  !editing ? 
                  (<div> 
                     {props.message.body} 
                  </div> )
                  :
                  (<SlateUpdate text={props.message.body} id={props.message.id} setEditing={setEditing}/>)

               }
            
            {props.message.photoUrl ? 
            <div className="modal-testing" >
               <img className={"imagetest"}src={props.message.photoUrl} alt=""/>
            </div>: null}
            {
            userId === currentUserId ? 
            <div className="delete-row">
            <div className="delete-text" onClick={() => {
               setEditing(true)
               console.log(editing)
               }} >
               edit
            </div>
            <div className="delete-text" style={{fontStyle: "normal"}}>{" | "}</div>
            <div className="delete-text" onClick={ () => { deleteMessage(props.message)(dispatch)}}>delete</div>
            </div>
            : null
            }
            </div>
         </div>

      </div>
   )
}