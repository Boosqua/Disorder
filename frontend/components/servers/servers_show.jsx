import React from 'react';
import ChannelsIndex from '../channels/channels_index_container'
import ServerCrudContainer from './server_crud_container'
export default class ServersShow extends React.Component {
   constructor(props) {
      super(props)
      this.state = { modal: false, 
         crud: '', 
         userModal: false, 
         username: this.props.user.username 
      }
      this.triggerModal = this.triggerModal.bind(this)
      this.handleCrud = this.handleCrud.bind(this)
      this.triggerUserModal = this.triggerUserModal.bind(this)
      this.handleInput = this.handleInput.bind(this)
      this.updateUser = this.updateUser.bind(this)
      this.handleClose = this.handleClose.bind(this)
   }

   triggerModal() {
      let oldModal = this.state.modal
      this.setState({ modal: !oldModal, crud:'' })
   }
   handleCrud(type){
      return (e) => {
         this.setState({ crud: type })
         e.stopPropagation()
      }
   }
   handleClose(e){
      if (e.target === this.reff ){
         this.setState({ username: this.props.user.username, userModal: false,});
         document.removeEventListener("click", this.handleClose)
      }
   }
   handleInput(e){
      this.setState({ username: e.currentTarget.value })
   }
   triggerUserModal() {
      let oldModal = !this.state.userModal
      if( oldModal ) {
         document.addEventListener("click", this.handleClose)
      }
      this.setState({ userModal: oldModal })
   }
   updateUser(e) {
      e.preventDefault();

      const user = {
         id: this.props.user.id,
         username: this.state.username
      }
      this.props.updateUser(user)
      this.triggerUserModal()
   }
   render() {
      const { server, user } = this.props
      const icons = [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon]
      const cog = window.cog
      let serverModal = 
         this.state.modal ? 
            <div className="server-crud">
                  {
                     user.id === server.owner_id ?
                     (<ul>
                     <li className="server-crud-options">
                     Invite People
                     </li>
                     <li className="crud-divide"/>
                     <li className="server-crud-options"
                     onClick={this.handleCrud("SERVER_EDIT")}>
                     Rename Server
                     {
                        this.state.crud === "SERVER_EDIT" ?
                           <ServerCrudContainer 
                           type="SERVER_EDIT" 
                           serverName={server.name} 
                           server={server}
                           triggerModal={this.triggerModal}/> :
                           null
                     }
                     </li>
                     <li className="server-crud-options"
                     onClick={this.handleCrud("CREATE_CHANNEL")}>
                     Add Channel
                     {
                        this.state.crud === "CREATE_CHANNEL" ?
                           <ServerCrudContainer 
                           type="CREATE_CHANNEL" 
                           serverName={server.name} 
                           server={server}
                           triggerModal={this.triggerModal}/> :
                           null
                     }
                     </li>
                     <li className="server-crud-options"
                     onClick={this.handleCrud("CHANNEL_EDIT")}>
                     Edit Channel Names
                     {
                        this.state.crud === "CHANNEL_EDIT" ?
                           <ServerCrudContainer 
                           type="CHANNEL_EDIT" 
                           serverName={server.name} 
                           server={server}
                           triggerModal={this.triggerModal}/> :
                           null
                     }
                     </li>
                     <li className="crud-divide"/>
                     <li className="server-crud-options"
                     id="server-delete">
                     Delete Server?
                     </li>
                     </ul>) :(<ul>
                     <li className="server-crud-options" >
                        Invite People
                     </li>
                     <li className="crud-divide"/>
                     <li className="server-crud-options"
                        id="server-delete">
                     Leave Server?
                     </li>
                     </ul>)
                  }
            </div> :
            null
      let userModal = 
         this.state.userModal ? 
            <div id="new-modal-outside" ref={(el) => { this.reff = el; }}>
               <div className="user-update-modal" >
                  <div className="change-username">
                     <p className="username">Change Name:</p>
                     <form onSubmit={ this.updateUser }>
                        <input type="text" onChange={this.handleInput} value={this.state.username} />
                     </form>
                  </div>
               </div>
            </div>  :
            null     
      return (<div className="server-show-outside">
         <div 
            className='server-header-container'
            onClick={this.triggerModal}
            >
            <div className='server-header'>
            {server.name}
            {serverModal}
            </div>
            <div id="arrow">{'. . .'}</div>
         </div>

         <div className="channels-index">
            <ChannelsIndex currentServerId={server.id} 
               updateChannelId={this.props.updateChannelId}/>
            <div className="user-profile-icon-container">
               <div className="user-profile-inside">
                  <div className="user-profile-photo">
                     <img 
                        className='user-profile-icon'
                        src={icons[user.user_image]}/>
                  </div>
                  <div className="profile-username">{user.username}</div>
                  <img id="cog" src={cog} alt="" onClick={ this.triggerUserModal }/>
               </div>
            </div>
         </div>
         {userModal}
      </div>)
   }
}
// add user to messages
