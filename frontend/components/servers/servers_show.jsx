import React from 'react';
import ChannelsIndex from '../channels/channels_index_container'
import ServerCrudContainer from './server_crud_container'
export default class ServersShow extends React.Component {
   constructor(props) {
      super(props)
      this.state = { modal: false, crud: ''}
      this.triggerModal = this.triggerModal.bind(this)
      this.handleCrud = this.handleCrud.bind(this)
   }

   triggerModal() {
      // console.log(this.state.modal)
      let oldModal = this.state.modal
      this.setState({ modal: !oldModal, crud:'' })
   }
   handleCrud(type){

      return (e) => {
         this.setState({ crud: type })
         e.stopPropagation()
      }
   }
   render() {
      const { server, user } = this.props
      console.log(user)
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
                     <li className="server-crud-options">
                     Add Channel
                     </li>
                     <li className="server-crud-options">
                     Edit Channel Names
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
      
      return (<div className="server-show-outside">
         <div 
            className='server-header-container'
            onClick={this.triggerModal}
            >
            <div className='server-header'>
            {server.name}
            {serverModal}
            </div>
            {/* <div id="curvedarrow"></div> */}
            <div id="arrow">{'. . .'}</div>
         </div>

         <div>
            <ChannelsIndex currentServerId={server.id} 
               updateChannelId={this.props.updateChannelId}/>
         </div>
         {/* <UsersShowContainer /> */}
      </div>)
   }
}
// add user to messages
