import React from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from "react-router"
export default function Header(props){
   const {id} = useParams()
   const pageName = useSelector((state) => {
      if(id === "@me") {
         return state.session.currentUser.username
      } else {
         return state.entities.servers[id].name
      }
   })
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
         <div className="ht">
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