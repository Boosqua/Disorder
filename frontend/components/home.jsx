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


   // updateChannelId(id) {
   //    let that = this
   //    let currentChannelName;
   //    return () => {
   //       debugger
   //       that.props.channels[that.props.currentServerId].forEach( (channel) => {
   //          if(channel.id === id){
   //             currentChannelName = channel.name
   //          }
   //       })
   //       that.setState({
   //          currentChannelId: id, 
   //          currentChannelName
   //       })

   //    }
   // }

   // updateServerId(id) {
   //    const channels = this.props.channels
   //    const servers = this.props.servers
   //    return () => {
   //       let server = servers[id]
   //       let channel = channels[id];
   //       this.props.receiveCurrentServer(server)
   //       this.setState({
   //          currentServerId: id,
   //          currentChannelId: channel[0].id,
   //          currentChannelName: channel[0].name
   //       })
   //    }
   // }

   // filterMessages(id){
   //    let messages = Object.values(this.props.messages).filter( message => {
   //       message.channelId === id;
   //    });
   //    this.setState({currentMessages: messages, currentChannelId: id})
   // }
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
               <div className="members">
                  .members
               </div>
            </div>
         // <div className='mount-component'>
         //    <ServersIndexContainer 
         //       user={this.props.user} 
         //       logout={this.props.logout}
         //       updateServerId={this.updateServerId}
         //       currentServerId={this.state.currentServerId}/>
         //    <ServersShowContainer 
         //       user={this.props.user} 
         //       server={this.props.servers[this.state.currentServerId]}
         //       updateChannelId={this.updateChannelId} 
         //       cable={this.cable}
         //       currentChannelId={this.state.currentChannelId}
         //       messages={this.state.currentMessages}/>
         //    <div className='server-messages-members'>
         //       <Banner currentChannelName={this.state.currentChannelName}/>
         //       <div className='inside-smm'>
         //          <MessageIndexContainer
         //             cable={this.cable}
         //             currentChannelId={this.state.currentChannelId}
         //             />
         //          <UserShowContainer />
         //       </div>
         //    </div>
         // </div>
      : null ) 
}
