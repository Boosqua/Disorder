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

export default function Home(props) {
   const [loaded, setLoaded] = useState(false)
   const dispatch = useDispatch()
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
               <MessageInput />
               <div className="members">
                  .members
               </div>
            </div>
      : null ) 
}
