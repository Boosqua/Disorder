import React from 'react'

export default class ServerCrud extends React.Component {
   constructor(props){
      super(props)
      this.state = { inputField: "" }
      this.changeServerName = this.changeServerName.bind(this)
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(e){
      e.preventDefault()
      this.setState({inputField: e.currentTarget.value})
   }
   changeServerName(e){
      e.preventDefault();
      let update = Object.assign({}, this.props.server)
      update.name = this.state.inputField
      this.props.updateServer(this.props.currentUserId, update)
      this.props.triggerModal()
   }
   render(){
      const type = this.props.type
      let crud;
      switch(type) {
      case "SERVER_EDIT":
         crud = (
            <div id="server-crud-action">
                  <div id="crud-title"> Change {this.props.serverName}? </div>
               <form onSubmit={this.changeServerName}>
                  <input 
                     type="text" 
                     className="crud-import-form" 
                     placeholder={this.props.serverName} 
                     value={this.state.inputField}
                     onChange={this.handleChange}/>
               </form>
            </div>
         )
         break;
      default:
         crud = <div></div>
      }
      return crud
   }
}