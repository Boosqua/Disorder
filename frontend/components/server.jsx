import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from "react-router"
import {receiveCurrentChannel} from "../actions/server_actions"
import {createChannel} from "../actions/channel_actions"
import Modal from "./reusable/modal"
export default function Server(props){
   const {id} = useParams()

   const dispatch = useDispatch()
   const [collapse, setCollapse] = useState(false)
   const channels = useSelector(state => {
      if( id !== "@me" ){
         return state.entities.channels[id]
      }
   })
   
   const [newChannelName, setNewChannelName] = useState("")
   const [modalPos, setModalPos] = useState(null)
   const [addChannelModal, setChannelModal] = useState(false)
   const currentChannel = useSelector(state => state.entities.currentChannel)
   const [channelId, setChannel] = useState(currentChannel)


   if( !channelId || !channels.some( channel => channel.id === channelId)) {
      dispatch(receiveCurrentChannel(channels[0].id))
      setChannel(channels[0].id)
      setCollapse(false)
   } 
   function handleSubmit(e) {
      e.preventDefault();
      let channel = {name: newChannelName }
      createChannel(parseInt(id), channel)(dispatch)
         .then(() => {
            setNewChannelName("")
            setChannelModal(false)
         })
      
   }
   let channelNamesP;
   if(channels && collapse ) {
      for( let i = 0; i < channels.length; i++ ) {
         if(channels[i].id === channelId){
            let channel = channels[i]
            channelNamesP = (<div className="cnc" key={channel.id} id={channel.id === channelId ? "selected" : ""}
            onClick={() => {
                  setChannel(channel.id)
                  dispatch(receiveCurrentChannel(channel.id))
               
            }}>
               <div className="cnt">
               {channel.name}
               </div>
            </div>)
         }
      }
   } else if (channels ){
      channelNamesP = channels.map(channel => {
         return (
            <div className="cnc" key={channel.id} id={channel.id === channelId ? "selected" : ""}
            onClick={() => {
                  setChannel(channel.id)
                  dispatch(receiveCurrentChannel(channel.id))
               
            }}>
               <div className="cnt">
               {channel.name}
               </div>
            </div>
         )
      }) 
   } else {
      channelNamesP = null
   } 
   const channelNames = channelNamesP
   return (
      <div className="server">
         <div className="sh">
         <div className="tch" onClick={() => {
            setCollapse(!collapse)
         }}>
            <div className={collapse ? "arrowr" : "arrow"}> {">"} </div>

                Text Channels

         </div>
         <div className="addChannel"
         onClick={(e) => {
            setModalPos({x: e.clientX, y: e.clientY})
            setChannelModal(true)
         }}>
            +
         </div>
         <Modal show={addChannelModal} position={modalPos} closeModal={setChannelModal}>
            
            <div className="inputform">
               <div className="inputformrow">
               <div className="inputformsection">Add Channel:</div>
               <form onSubmit={handleSubmit}>
               <input type="text" value={newChannelName} onChange={(e) => setNewChannelName(e.target.value)}/>
               </form>
               </div>
            </div>
         </Modal>
         </div>
         {channelNames}
      </div>
   )
}