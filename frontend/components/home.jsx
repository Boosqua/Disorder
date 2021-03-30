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

import { fetchFriends, fetchFriendRequests, receiveFriend, receiveFriendRequest } from "../actions/friend_actions"
import { useSelector, useDispatch } from 'react-redux';
import MessageInput from "./message_input"
import {receiveMessage} from '../actions/message_actions'
import ServerMembers from "./server_members"
import FriendList from "./friend_list"
export default function Home(props) {
   const [loaded, setLoaded] = useState(false)
   const dispatch = useDispatch()
   const [collapse, setCollapse] = useState(false)
   const [channelChange, setChannelChange] = useState(1)
   const id = useSelector(state => state.session.currentUser.id)

   const messageChannel = App.cable.subscriptions.create({
      channel: 'MessagesChannel',
      id: id
   },
   {
      received: (data) => {
         dispatch(receiveMessage(data))
      },
   })

   const friendRequestsChannel = App.cable.subscriptions.create({
      channel: "FriendRequestsChannel",
      id: id
   },
   {
      received: (data) => {
         dispatch(receiveFriendRequest(data))
      }
   })
   const friendChannel = App.cable.subscriptions.create({
      channel: "FriendsChannel",
      id: id
   },
   {
      received: (data) => {
         dispatch(receiveFriend(data))
      }
   })
   useEffect(() => {
      fetchServers(id)(dispatch)
      .then(() => fetchChannels(id)(dispatch))
      .then(() => fetchMessages(id)(dispatch))
      .then(() => fetchUsers()(dispatch))
      .then(() => fetchFriends()(dispatch))
      .then(() => fetchFriendRequests()(dispatch))
      .then(() => setLoaded(true))

   }, [])

   const path = useParams().id
      return (
         loaded ?
            <div className={path === "@me" || collapse ?"container-hm" : "container"}>
               <div className="sidebar">
               <ServersIndex/>
               </div>
               <Header channel={friendRequestsChannel}/>
               { 
                  path === "@me" ? 
                  <FriendList setChannelChange={setChannelChange}channel={friendChannel}/> : 
                  <Server />
               }

                  <Messages channelChange={channelChange}/>

               <MessageInput key={channelChange}messageChannel={messageChannel} setChannelChange={setChannelChange} channel={channelChange}/>
{
                  path === "@me" ? 
                  null : 
                  <ServerMembers channel={friendRequestsChannel}/>
               }
                  
            </div>
      : null ) 
}
