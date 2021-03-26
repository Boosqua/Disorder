import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from './reusable/icon_button'
export default function MessageShow(props) {
   const userId = props.message.author_id
   const user = useSelector( state => state.entities.users[userId])
   const userImage = [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][user.user_image]
   const userName = user.username
   const date = props.message.created_at.split("-")
   return (
      <div className="msc">
         {
            props.messageHeader ? 
            <div className="umid">
            <IconButton   height="35px" width="35px" image={userImage}/>
            </div> :
            null
         }
         
         <div className="umb">
            {
               props.messageHeader ? 
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
            {props.message.body}
            </div>
         </div>
      </div>
   )
}