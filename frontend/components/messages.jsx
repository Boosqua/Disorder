import React, {useEffect, useRef} from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import MessageShow from './message_show'

export default function Messages(props){

   const serverId = useParams().id
   const channel = useSelector( (state) => {
      if ( serverId !== "@me" ){
         const channelId = state.session.channelId;
         const channels = state.entities.channels[serverId];
         for( let i = 0; i < channels.length; i++){
            if ( channels[i].id === channelId ) {
               return channels[i];
            }
         }
      } else {
         return state.entities.users[state.session.channelId] ? state.entities.users[state.session.channelId] : {username: ""}
      }
   })
   const currentUser = useSelector( (state) => state.session.currentUser )
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

   const channelName = {
      name: "", firstMessage: ""
      }
   let allMessages1;

      channelName.name = channel && serverId !== '@me' ? channel.name : `${currentUser.username} and ${channel.username}'s Messages`;
      channelName.firstMessage = channel && serverId !== '@me' ? channel.name : `${currentUser.username} and ${channel.username}`;

      if( serverId !== "@me" ){
         allMessages1 = channel ? useSelector( state => state.entities.messages.Channel[channel.id] ? Object.values(state.entities.messages.Channel[channel.id]) : []) : []
      } else {
         allMessages1 = channel ? useSelector( state => state.entities.messages.Friend[state.entities.users[channel.id].friendshipId] ? Object.values(state.entities.messages.Friend[state.entities.users[channel.id].friendshipId]) : []) : []
      }

   const messages = allMessages1

   return (
      channel && (channel.name || channel.username)? 
      (<div className="messages">
         <div className="wmc">
            <div className="wmcn">
               {`Welcome to ${channelName.name}!`}
            </div>
            <div className="wmhs">
               {`This is the beginning of ${channelName.firstMessage}'s message history.`}
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
   ) : (<div className="messages">
         <div className="wmc">
            <div className="wmcn">
               {`This if where you would message your friends`}
            </div>
            <div className="wmhs" style={{fontStyle: "italic"}}>
               {`if you had any...`}
            </div>

         </div>
         <div style={{ float:"left", clear: "both" }}
             ref={messagesEnd} />
      </div>
      )
   )
      
}