import React, {useEffect, useRef} from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import MessageShow from './message_show'
import {receiveMessage} from "../actions/message_actions"
export default function Messages(props){

   const serverId = parseInt(useParams().id)
   const channel = useSelector( (state) => {
      const channelId = state.session.channelId;
      const channels = state.entities.channels[serverId];
      for( let i = 0; i < channels.length; i++){
         if ( channels[i].id === channelId ) {
            return channels[i];
         }
      }
   })
   const defaultUserImages = [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon]
   const messagesEnd = useRef(null);
   useEffect(() => {
      messagesEnd.current.scrollIntoView({ behavior: "auto" });
   })
   let lastId = null
   function checkId(userId){
      if(lastId !== userId){
         lastId = userId
         return true
      }
      return false
   }
   const channelName = channel.name
   const messages = useSelector( state => Object.values(state.entities.messages[channel.id]))
   console.log(messages)
   return (
      <div className="messages">
         <div className="wmc">
            <div className="wmcn">
               {`Welcome to ${channelName}!`}
            </div>
            <div className="wmhs">
               {`This is the beginning of ${channelName}'s message history.`}
            </div>
            <div className="line"></div>
         </div>

         <div className="mc">
            {messages.map( (message, index) => {
               return (
                  <MessageShow key={index} message={message} messageHeader={checkId(message.author_id)}/>
               )
            })}
         </div>
         <div style={{ float:"left", clear: "both" }}
             ref={messagesEnd} />
      </div>
   )
}