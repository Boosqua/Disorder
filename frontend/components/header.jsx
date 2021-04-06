import React, {useRef, useState} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from "react-router"
import {Link} from "react-router-dom"
import {deleteServerMember, updateServer, deleteServer} from "../actions/server_actions"
import User from "./user"
import IconButton from "./reusable/icon_button"
import {receiveCurrentChannel} from "../actions/server_actions"
import Modal from "./reusable/modal"
import InputText from "./reusable/input_text"
import {createInvite} from "../actions/invitation_actions"

export default function Header(props){
   const {id} = useParams()
   const imageUpload = useRef(null)
   const dispatch = useDispatch()
   const [serverModal, setServerModal] = useState(false)
   const [nestedModal, setNestedModal] = useState(false)
   const [nestedModalType, setNestedModalType] = useState("")
   const [modalPos, setModalPos] = useState(null)
   const [nestedPos, setNestedPos] = useState(null)
   const [userOptions, setUserOptions] = useState(false)
   const [invite, setInvite] = useState(false)
   const user = useSelector(state => state.session.currentUser)
   const userId = user.id
   const server = useSelector((state) => {
      if(id === "@me") {
         return state.session.currentUser.username
      } else {
         return state.entities.servers[id]
      }
   })
   function handleUpload(e) {
      const reader = new FileReader();
      const file = e.currentTarget.files[0]; 
      if (file) {
         reader.readAsDataURL(file);
         const updatedServer = new FormData()
         updatedServer.append( 'server[id]', server.id)
         updatedServer.append( 'server[photo]', file)
         updateServer(userId, server.id, updatedServer)(dispatch)
      } 
   }
   const pageName = server.name ? server.name : server
   const [newServerName, setNewServerName] = useState("")
   const ownedServer = useSelector(state => state.session.currentUser.id) === server.owner_id
   function nestedContent() {
      switch (nestedModalType) {
         case "CHANGE_CHANNEL_NAME":
            return (<div className="inputform">
                     <div className="inputformrow">
                        <InputText handleSubmit={(text) => {
                           const updatedServer = new FormData()
                           updatedServer.append("server[name]", text)
                           updateServer(server.owner_id, server.id, updatedServer)(dispatch)
                           setNestedModal(false)
                           setServerModal(false)
                        }}/>
                     </div>
                  </div>)
         case "DELETE_SERVER":
            return (
               <div className="inputform">
               <div className="inputformrow">
               <div className="inputformsection"> {`Are you sure you want to delete ${pageName}?`}
               </div>
               <Link to='/server/@me'>
               <div className="modalbutton" onClick={(e) => {
                  dispatch(receiveCurrentChannel(null))
                  deleteServer(userId, parseInt(id))(dispatch)
                  setNestedModal(false)
                  setServerModal(false)
                  setNestedModalType("")
               }}>confirm</div>
               </Link>
               <Link>
               <div className="modalbutton" onClick={() => {
                  setNestedModal(false) 
                  }}>
                     cancel
                  </div>
               </Link> 
               </div>
            </div>
            )
         default:
            return null;
      }
   }
   function modalContent() {
      if(ownedServer){
         return (
            <div className="inputform">
               <div className="inputformrow" id="highlight" onClick={(e)=> {
                  setNestedPos({x: e.clientX, y: e.clientY})
                  setNestedModalType('CHANGE_CHANNEL_NAME')
                  setNestedModal(true)
               }}>
                  <div className="inputformsection" >
                     Change Server Name
                  </div>
               </div>
               <div className="inputformrow"
               id="highlight"
                  onClick={(e)=> {
                     imageUpload.current.click()
                     setServerModal(false)
                  }}>
                     <div className="inputformsection" id="highlight">
                        Update Server Image
                     </div>
               </div>
               <div className="linebb"></div>
                <div className="inputformrow"
                  id="highlight-grey"
                  onClick={ () => {
                  setInvite(true) 
                  setServerModal(false)
                  }}>
                  <div className="inputformsection" style={{ color: "#6679bb" }}>
                     Invite People
                  </div>
               </div>
               <div className="linebb"></div>
               {
                  server.photoUrl ?
                  <div className="inputformrow"
                  id="highlight-grey"
                  onClick={(e)=> {
                     const updatedServer = new FormData()
                     updatedServer.append("server[deletePhoto]", true)
                     updatedServer.append("server[id]", server.id)
                     updateServer(userId, server.id, updatedServer)(dispatch)
                     setNestedModal(false)
                     setServerModal(false)
                     setNestedModalType("")
                  }}>
                     <div className="inputformsection"  style={{color: "red"}}>
                        Delete Server Image
                     </div>
               </div> :
               null
               }
               <div className="inputformrow"
               id="highlight-grey"
                  onClick={(e)=> {
                  setNestedPos({x: e.clientX, y: e.clientY})
                  setNestedModalType('DELETE_SERVER')
                  setNestedModal(true)
                  
               }}>
                     <div className="inputformsection"  style={{color: "red"}}>
                        {`Delete ${pageName}`}
                     </div>
               </div>
               <Modal 
               show={nestedModal} 
               closeModal={() => {
                  setNestedModal(false)
                  setNewServerName("")
                  setNestedModalType("")
               }} 
               position={nestedPos}>
                  {nestedContent()}
               </Modal>
            </div>
         )
      } else {
         return  (
            <div className="inputform">
               <div className="inputformrow"
                  id="highlight-grey"
                  onClick={ () => {
                     setServerModal(false)
                     setInvite(true)
                      }}>
                  <div className="inputformsection" style={{ color: "#6679bb" }}>
                     Invite People
                  </div>
               </div>
               <div className="linebb"></div>
               <div className="inputformrow">
               <div className="inputformsection"> {`Leave ${pageName}?`}
               </div>
               <Link to='/server/@me'>
               <div className="modalbutton" onClick={(e) => {
                  deleteServerMember({server_id: parseInt(id), user_id: userId})(dispatch)
                  setServerModal(false)
                  dispatch(receiveCurrentChannel(null))
               }}>confirm</div>
               </Link>
               <Link>
               <div className="modalbutton" onClick={() => setServerModal(false) }>cancel</div>
               </Link> 
               </div>
            </div>
         )
      }
   }
   const channelName = useSelector( (state) => {
      if( id=== "@me") {
         return ""
      } 
      let channels = state.entities.channels[id]
      for( let i = 0; i < channels.length; i++ ){
         if(channels[i].id === state.session.channelId){
            return channels[i].name
         }
      }
   })
   return (
      <div className="header">
         <Modal show={serverModal} closeModal={() => { setServerModal(false)}} position={modalPos} >
            {modalContent()}
         </Modal>
         <div className="ht" onClick={ (e) => {
            if (id === "@me") {
               setUserOptions(true)
            } else {
               setModalPos({x: e.clientX, y: e.clientY})
               setServerModal(true)
            }
         }}>
            <div className="htt">
            {pageName}
            
            </div>
         </div>
         <div className="hc">
            <div className="httt">
            {channelName}
            </div>
            <div className="headerbuttonscontainter">
               {
                  id === "@me" ?
                  null :
                  <img className="min-icon" src={window.min} alt="" onClick={() => props.setCollapse(!props.collapse)}/>
               }
            </div>
         </div>
         <input type="file"
            style={ {display: 'none'} }
            ref={imageUpload}
            onChange={e => handleUpload(e)}
         />
            {
               id === "@me" ?
               <User setUserOptions={setUserOptions} userOptions={userOptions} user={user} /> : 
               null
            }
            <SendInvite invite={invite} close={() => setInvite(false)} server={server}/>
      </div>
   )
}

function SendInvite({invite, close, server}) {
   const [invited, setInvited] = useState([])
   const dispatch = useDispatch()
   const [users, currentUserId] = useSelector( state => {
      let ids = state.entities.servers[server.id] ? state.entities.servers[server.id].members : []
      let members = [];
      for( let i = 0; i < ids.length; i++ ){
         if(ids[i] !== state.session.currentUser.id && invited.indexOf(ids[i]) === -1){
            members.push(state.entities.users[ids[i]])
         }
      }
      const users = Object.values(state.entities.users).sort( (a,b) => {
         let nameA = a.username.toUpperCase(); 
         let nameB = b.username.toUpperCase(); 
         if (nameA < nameB) {
            return -1;
         }
         if (nameA > nameB) {
            return 1;
         }
         return 0;
      }).filter( user => invited.indexOf(user.id) < 0)
      const currentUserId = state.session.currentUser.id
      return [users, currentUserId]
   })
   function handleSubmit(text){
      createInvite({sender_id: currentUserId, receiver_name: text, server_id: server.id})(dispatch)
   }
   return (
      <Modal show={invite} closeModal={close}>
         <div className="inviteform">
         <div className="inputformrow">
            <div className="inviteheader">{`Invite Users to ${server.name}`}</div>
         </div>
         <div className="linebb"></div>
         {
            users.length ? 
         <div className="inviteuserscontainer">
         {
            
         users.map( (user) => {
            const userImage = user.photo ? user.photo : [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon][user.user_image]
            return (
                  <div className="inviteicr">
                     <div className="inviterow">
                     <IconButton width="30px" height="30px" image={userImage}/>
                        <div className="invitebi">
                           {user.username}
                        </div>
                     </div>
                        <div className="modalbutton" onClick={() => {
                           let seent = [...invited]
                           seent.push(user.id)
                           setInvited(seent)
                           createInvite({sender_id: currentUserId, receiver_id: user.id, server_id: server.id})(dispatch)
                        }}> Invite </div>
                  </div>
            )
         })
            
         }
          </div>
          : <div className="inputformrow" >
            <div className="inviteheader" style={{color: "red"}} >{`No users found!`}</div>
         </div>
         }
         {
            invite ?
            <div className="inviteInput">
               <div className="inputformrow">
               <div className="inviteheader">{`Send Invite`}</div>
               </div>
               <div style={{width: "80%", paddingLeft: "10px"}}>
                  <InputText handleSubmit={handleSubmit} />
               </div>
            </div>
            : null
         }
         </div>
      </Modal>
   )
}