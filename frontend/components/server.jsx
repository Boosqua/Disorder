import React, { useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from "react-router"
import {receiveCurrentChannel} from "../actions/server_actions"
export default function Server(props){
   const {id} = useParams()
   const dispatch = useDispatch()
   const channels = useSelector(state => {
      if( id !== "@me" ){
         return state.entities.channels[id]
      }
   })
   const currentChannel = useSelector(state => state.entities.currentChannel)
   const [channelId, setChannel] = useState(currentChannel)
   if( !channelId || !channels.some( channel => channel.id === channelId)) {
      dispatch(receiveCurrentChannel(channels[0].id))
      setChannel(channels[0].id)
   } 

   const channelNames = channels ? 
      channels.map(channel => {
         return (
            <div className="cnc" key={channel.id} id={channel.id === channelId ? "selected" : ""}
            onClick={() => {
               if( channel.id !== channelId){
                  dispatch(receiveCurrentChannel(channel.id))
               }
            }}>
               <div className="cnt">
               {channel.name}
               </div>
            </div>
         )
      }) : null;
   return (
      <div className="server">
         <div className="sh">
         <div className="tch">
            Text Channels
         </div>
         <div className="addChannel">
            +
         </div>
         </div>
         {channelNames}
      </div>
   )
}