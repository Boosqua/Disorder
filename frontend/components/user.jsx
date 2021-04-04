import React from "react";
import Modal from "./reusable/modal"
import IconButton from "./reusable/icon_button"
export default function Friend({setUserOptions, userOptions, user}){
   const userImage = [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][user.user_image]
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
                     <div className="usercrudbutton">Update Icon</div>
                     <div className="usercrudbutton">Delete Icon</div>
                  </div> :
                  <div className="usercrudbib">
                     <div className="usercrudbutton">Upload Icon</div>
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
      </Modal>
   )
}