import React, {useRef, useState} from "react";
import Modal from "./reusable/modal"
import IconButton from "./reusable/icon_button"
import { updateCurrentUserPhoto } from "../actions/session_actions"
export default function Friend({setUserOptions, userOptions, user}){
   const userImage = user.photo ? user.photo : [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][user.user_image]
   const imageUpload = useRef(null);

   function handleUpload(e) {
      const reader = new FileReader();
      const file = e.currentTarget.files[0]; 
      if (file) {
         reader.readAsDataURL(file);
         const updatedUser = new FormData()
         updatedUser.append( 'user[id]', user.id)
         updatedUser.append( 'user[photo]', file)
         updateCurrentUserPhoto(user.id, updatedUser)(dispatch)
      } 
   }
   function deleteUserIcon(){
      const updatedUser = new FormData()
      updatedUser.append( 'user[id]', user.id)
      updatedUser.append( 'user[delete_photo]', true)
      updateCurrentUserPhoto(user.id, updatedUser)(dispatch)
   }
   return (
      <Modal show={userOptions} closeModal={() => {setUserOptions(false)}}>
         <div className="usercrudc">
            <div className="usercrudunb">
               <div className="usercrudbi">
                  <IconButton image={userImage} width={"70px"} height={"70px"}/>
               </div>
               <div className="usercrudbi">{user.username}</div>
               {
                  user.photo ?
                  <div className="usercrudbib">
                     <div className="usercrudbutton" onClick={() => {imageUpload.current.click()}}>Update Icon</div>
                     <div className="usercrudbutton" onClick={deleteUserIcon}>Delete Icon</div>
                  </div> :
                  <div className="usercrudbib">
                     <div className="usercrudbutton" onClick={() => {imageUpload.current.click()}}>Upload Icon</div>
                  </div>
               }
            </div>
            <div className="usercrudic">
               <div className="usercrudicr">
                  <div className="usercrudicc">
                     <div className="usercrudh">
                        USERNAME
                     </div>
                     <div className="usercrudbi">
                        {user.username}
                     </div>
                  </div>
                  <div className='usercrudbutton'>
                     Edit
                  </div>
               </div>
            </div>
            <div className="usercrudic2">
               <div className="userdeletebutton">
                  DELETE ACCOUNT
               </div>
            </div>
         </div>
         <input type="file"
            style={ {display: 'none'} }
            ref={imageUpload}
            onChange={e => handleUpload(e)}
         />
      </Modal>
   )
}