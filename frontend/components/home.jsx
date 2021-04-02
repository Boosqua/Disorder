import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from "react-router-dom"
import ServersIndex from './servers_index';
import Server from "./server"
import Header from "./header.jsx"
import Messages from './messages/messages'
import {fetchServers} from "../actions/server_actions"
import {fetchChannels} from "../actions/channel_actions"
import {fetchMessages} from "../actions/message_actions"
import {fetchUsers} from "../actions/user_actions"
import { fetchFriends, fetchFriendRequests, receiveFriend, receiveFriendRequest } from "../actions/friend_actions"
import { useSelector, useDispatch } from 'react-redux';
import MessageInput from "./messages/message_input"
import {receiveMessage, fetchMessage} from '../actions/message_actions'
import ServerMembers from "./server_members"
import FriendList from "./friend_list"
import { fetchAllSubscriptions } from '../actions/actioncable_actions';
export default function Home(props) {
   const [loaded, setLoaded] = useState(false)
   const dispatch = useDispatch()
   const [collapse, setCollapse] = useState(false)
   const [channelChange, setChannelChange] = useState(1)
   const [id] = useSelector(state => {
      const id = state.session.currentUser.id
      const servers = state.entities.servers
      return [id]
   })

//   const messageChannel = App.cable.subscriptions.create({
//       channel: 'MessagesChannel',
//       id: id
//    },
//    {
//       received: (data) => {
//          if(!data.photoUrl){
//             dispatch(receiveMessage(data))
//          } else {
//             fetchMessage(data.imageable_id, data.id)(dispatch)
//          }
//       },
//    })

//    const friendRequestsChannel = App.cable.subscriptions.create({
//       channel: "FriendRequestsChannel",
//       id: id
//    },
//    {
//       received: (data) => {
//          dispatch(receiveFriendRequest(data))
//       }
//    })
//    const friendChannel = App.cable.subscriptions.create({
//       channel: "FriendsChannel",
//       id: id
//    },
//    {
//       received: (data) => {
//          App.cable.subscriptions.create({
//             channel: 'MessagesChannel',
//             type: "friendship",
//             id: data.id
//          },
//          {
//             received: (data) => {
//                if(!data.photoUrl){
//                   dispatch(receiveMessage(data))
//                } else {
//                   fetchMessage(data.imageable_id, data.id)(dispatch)
//                }
//             },
//          })
//          dispatch(receiveFriend(data))
//       }
//    })
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
      : null ) 
}
