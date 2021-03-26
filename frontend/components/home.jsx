import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom"
import ServersIndex from './servers/servers_index';
import Server from "./server"
import Header from "./header.jsx"
import Messages from './messages'
import {fetchServers} from "../actions/server_actions"
import {fetchChannels} from "../actions/channel_actions"
import {fetchMessages} from "../actions/message_actions"
import {fetchUsers} from "../actions/user_actions"
import { useSelector, useDispatch } from 'react-redux';
import MessageInput from "./message_input"
import {receiveMessage} from '../actions/message_actions'
import ServerMembers from "./server_members"
export default function Home(props) {
   const [loaded, setLoaded] = useState(false)
   const dispatch = useDispatch()
   const channelId = useSelector(state => state.session.channelId)

   const channel = App.cable.subscriptions.create({
      channel: 'MessagesChannel',
      id: channelId
   },
   {
      received: (data) => {
         dispatch(receiveMessage(data))
      },
   })
   const id = useSelector(state => state.session.currentUser.id)
   useEffect(() => {
         fetchServers(id)(dispatch)
      .then(() => fetchChannels(id)(dispatch))
      .then(() => fetchMessages(id)(dispatch))
      .then(() => fetchUsers()(dispatch))
      .then(() => setLoaded(true))
   }, [])

   const path = useParams().id

      return (
         loaded ?
            <div className="container">
               <div className="sidebar">
               <ServersIndex/>
               </div>
               <Header />
               { 
                  path === "@me" ? 
                  null : 
                  <Server />
               }
               {
                  path === "@me" ? 
                  null : 
                  <Messages />
               }
               <MessageInput channel={channel}/>
{
                  path === "@me" ? 
                  null : 
                  <ServerMembers />
               }
                  
            </div>
      : null ) 
}
