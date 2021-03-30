// import React from 'react'

// export default class ServerCrud extends React.Component {
//    constructor(props){
//       super(props)
//       this.state = { inputField: "", currentChannelId: null, currentChannel: null}
//       this.changeServerName = this.changeServerName.bind(this)
//       this.handleChange = this.handleChange.bind(this)
//       this.handleChannelChange = this.handleChannelChange.bind(this)
//       this.changeChannelName = this.changeChannelName.bind(this)
//       this.createChannel = this.createChannel.bind(this)
//       this.handleClose = this.handleClose.bind(this)
//    }
//    componentDidMount(){
//       let that = this;
//       this.shown = true
//       this.event = document.addEventListener("click", this.handleClose)
//    }
//    handleClose(e){
//       if (e.currentTarget !== this.reff ){
//          this.setState({ inputField: ""});
//          this.props.triggerModal();
//       }
//       document.removeEventListener("click", this.handleClose)
//    }
//    handleChange(e){
//       this.setState({inputField: e.currentTarget.value})
//    }
//    handleChannelChange(channel) {
//       return (e) => {
//          this.setState({inputField: e.currentTarget.value, currentChannelId: channel.id, currentChannel: channel})
//       }
//    }
//    createChannel(e) {
//       e.preventDefault()
//       let channel = {
//          server_id: this.props.currentServerId,
//          name: this.state.inputField
//       }
//       this.props.createChannel(channel.server_id, channel)
//       this.props.triggerModal()
//    }
//    changeChannelName(e){
//       e.preventDefault();
//       let channel = Object.assign( {}, this.state.currentChannel, { name: this.state.inputField } )
//       this.props.updateChannel(channel.server_id, channel)
//       this.state = { inputField: "", currentChannelId: null, currentChannel: null}
//       this.props.triggerModal()
      
//    }
//    changeServerName(e){
//       e.preventDefault();
//       let update = Object.assign({}, this.props.server)
//       update.name = this.state.inputField
//       this.props.updateServer(this.props.currentUserId, update)
//       this.props.triggerModal()
//    }
//    render(){
//       const type = this.props.type
//       let crud;
//       switch(type) {
//       case "SERVER_EDIT":
//          crud = (
//             <div id="server-crud-action" ref={(el) => { this.reff = el; }}>
//                   <div id="crud-title"> Change {this.props.serverName}? </div>
//                <form onSubmit={this.changeServerName}>
//                   <input 
//                      type="text" 
//                      className="crud-import-form" 
//                      placeholder={this.props.serverName} 
//                      value={this.state.inputField}
//                      onChange={this.handleChange}/>
//                </form>
//             </div>
//          )
//          break;
//       case "CHANNEL_EDIT":
//          const { allChannels } = this.props 
//          const channels = allChannels[this.props.currentServerId]
//          crud = (
//             <div id="server-crud-action" ref={(el) => { this.reff = el; }}>
              
//                   {
//                      channels.map((channel, index) => (
//                         <div key={index}>
//                            <div id="crud-title"> Change {channel.name}?</div>
//                             <form onSubmit={this.changeChannelName}>
//                            <input 
//                               type="text" 
//                               className="crud-import-form" 
//                               placeholder={channel.name} 
//                               value={
//                                  this.state.currentChannelId === channel.id ?
//                                  this.state.inputField :
//                                  "" }
//                               onChange={this.handleChannelChange(channel)}
//                               /></form>
//                         </div>
//                      ))
                     
//                   }
//             </div>
//          )
//          break;
//       case 'CREATE_CHANNEL':
//          crud = (
//             <div id="server-crud-action" ref={(el) => { this.reff = el; }}>
//                <div id="crud-title"> Add Channel! </div>
//                <form onSubmit={this.createChannel}>
//                   <input 
//                      type="text" 
//                      className="crud-import-form" 
//                      placeholder="Channel Name" 
//                      value={this.state.inputField}
//                      onChange={this.handleChange}/>
//                </form>
//             </div>
//          )
      
//          break
//       default:
//          crud = null
//       }
//       return crud
//    }
// }