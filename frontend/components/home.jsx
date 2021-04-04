import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom"
import ServersIndex from './servers_index';
import Server from "./server"
import Header from "./header.jsx"
import Messages from './messages/messages'
import {fetchServers} from "../actions/server_actions"
import {fetchChannels} from "../actions/channel_actions"
import {fetchMessages} from "../actions/message_actions"
import {fetchUsers} from "../actions/user_actions"
import { fetchFriends, fetchFriendRequests } from "../actions/friend_actions"
import { useSelector, useDispatch } from 'react-redux';
import MessageInput from "./messages/message_input"
import ServerMembers from "./server_members"
import FriendList from "./friend_list"
import { fetchAllSubscriptions } from '../actions/actioncable_actions';
import Errors from "./errors/user_errors"
import Loading from "./loading"
export default function Home(props) {
   const [loaded, setLoaded] = useState(false)
   const dispatch = useDispatch()
   const [collapse, setCollapse] = useState(false)
   const [channelChange, setChannelChange] = useState(1)
   const [id] = useSelector(state => {
      const id = state.session.currentUser.id
      return [id]
   })

   useEffect(() => {
      fetchServers(id)(dispatch)
      .then(() => fetchChannels(id)(dispatch))
      .then(() => fetchMessages(id)(dispatch))
      .then(() => fetchUsers()(dispatch))
      .then(() => fetchFriends()(dispatch))
      .then(() => fetchFriendRequests()(dispatch))
      .then(() => fetchAllSubscriptions(id)(dispatch))
      .then(() => setLoaded(true))
       
   }, [])

   const path = useParams().id
      return (
         loaded ?
            <div className={path === "@me" || collapse ? "container-hm" : "container"}>
               <Errors/>
               <div className="sidebar">
               <ServersIndex/>
               </div>
               <Header setCollapse={setCollapse}
               collapse={collapse}/>

               { 
                  path === "@me" ? 
                  <FriendList setChannelChange={setChannelChange}/> : 
                  <Server />
               }

                  <Messages channelChange={channelChange}/>

               <MessageInput key={channelChange} setChannelChange={setChannelChange} channel={channelChange}/>
               {
                  path === "@me" ? 
                  null : 
                  <ServerMembers />
               }
                  
            </div>
      : <Loading/> ) 
}
