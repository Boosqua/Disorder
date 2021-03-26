import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import IconButton from "./reusable/icon_button"
export default function ServerMembers(props){
   const serverId = parseInt(useParams().id)
   const ownerId = useSelector( state => state.entities.servers[serverId].owner_id)
   const ServerMembers = useSelector(state => {
      const ids = state.entities.servers[serverId].members
      let members = [];
      for( let i = 0; i < ids.length; i++ ){
         members.push(state.entities.users[ids[i]])
      }
      return members.sort( (a,b) => {
         var nameA = a.username.toUpperCase(); // ignore upper and lowercase
         var nameB = b.username.toUpperCase(); // ignore upper and lowercase
         if (nameA < nameB) {
            return -1;
         }
         if (nameA > nameB) {
            return 1;
         }

         // names must be equal
         return 0;
      })

   })

   return (
      <div className="members">
         <div className="smh">
            {`MEMBERS - ${ServerMembers.length}`}
         </div>
         {
            ServerMembers.map( member => {
               const userImage = [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][member.user_image]
               return (
               <div className="smc" key={member.id}>
                  <IconButton height="30px" width="30px" image={userImage}/>
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
         
      </div>
   )
}