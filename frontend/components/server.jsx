import React, { useState } from "react"
import Messages from "./messages/messages"
import InputText from "./reusable/input_text"
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from "react-router"
import {receiveCurrentChannel} from "../actions/server_actions"
import {createChannel, updateChannel, deleteChannel} from "../actions/channel_actions"
import Modal from "./reusable/modal"
export default function Server(props){
   const {id} = useParams()

   const dispatch = useDispatch()
   const [collapse, setCollapse] = useState(false)
   const [channels, ownedServer] = useSelector(state => {
         const channels =  state.entities.channels[id]
         const ownedServer = state.entities.servers[id].owner_id === state.session.currentUser.id
         return [channels, ownedServer]
   })

   const [contextModalChannel, setContextModalChannel] = useState(null)
   const [newChannelName, setNewChannelName] = useState("")
   const [contextModal, setContextModal] = useState(false)
   const [modalPos, setModalPos] = useState(null)
   const [addChannelModal, setChannelModal] = useState(false)
   const [nestedModal, setNestedModal] = useState(false)
   const [nestedPos, setNestedModalPos] = useState(null)
   const [nestedType, setNestedType] = useState("")
   const currentChannel = useSelector(state => state.entities.currentChannel)
   const [channelId, setChannel] = useState(currentChannel)
   
   function handleContext(channel){
      return (e) => {
         if( ownedServer ){
            e.preventDefault()
            setModalPos({x: e.clientX, y: e.clientY})
            setContextModal(true)
            setContextModalChannel(channel)
         }
      }
   }

   if( !channelId || !channels.some( channel => channel.id === channelId)) {
      dispatch(receiveCurrentChannel(channels[0].id))
      setChannel(channels[0].id)
      setCollapse(false)
   } 
   function handleSubmit(e) {
      e.preventDefault();
      
      
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
            }}
            onContextMenu={handleContext(channel)}
            >
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
            onClick={(e) => {
                  setChannel(channel.id)
                  dispatch(receiveCurrentChannel(channel.id))
               
            }}
            onContextMenu={
               handleContext(channel)
            }
            >
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
   function ctxhtml(){
      if(!contextModalChannel){
         return null;
      }
      function secondModal(channel){
         switch (nestedType) {
            case "RENAME":
               return(
                  <div className="inputform">
                     <div className="inputformrow">
                        <InputText handleSubmit={ (text) => {
                           let updatedChannel = Object.assign(contextModalChannel, {name: text})
                           updateChannel(updatedChannel.server_id, updatedChannel)(dispatch)
                           setNestedModal(false)
                           setContextModal(false)
                        }}/>
                     </div>
                  </div>
               )
            default:
               null
         }
      }
      return (
         <div className="inputform">
            <div className="inputformrow" id="highlight" onClick={ (e) => {
               setNestedType("RENAME")
               setNestedModal(true)
               setNestedModalPos({x: e.clientX + 20, y: e.clientY })
               }}
               >
               <div className="inputformsection" >
                  {`Rename ${contextModalChannel.name}`}
               </div>
            </div>
            <div className="inputformrow" id="highlight-grey" onClick={ () => {
               deleteChannel(contextModalChannel.server_id, contextModalChannel.id)(dispatch)
               setContextModalChannel(null)
               setContextModal(false)
            }}>
               <div className="inputformsection"  style={{color: "red"}}>
                  {`Delete ${contextModalChannel.name}`}
               </div>
            </div>
            <Modal 
            show={nestedModal}
            position={nestedPos}
            closeModal={() => {
               setNestedModal(false)
               setNestedType("")
            }}
            >
               {secondModal()}
            </Modal>

         </div>         
      )
   }
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
               <InputText handleSubmit={ (text) => {
                  let channel = {name: text }
                  createChannel(parseInt(id), channel)(dispatch)
                  setNewChannelName("")
                  setChannelModal(false)
               }}/>
               </div>
            </div>
         </Modal>
         <Modal show={contextModal} position={modalPos} closeModal={() => {
            setContextModal(false)
            setContextModalChannel(null)
         }}>
            {ctxhtml()}
         </Modal>
         </div>
         {channelNames}
      </div>
   )
}