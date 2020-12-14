import React from 'react';
import MessageShow from './message_show'
import Modal from '../modal'
export default class MessageIndex extends React.Component {
   constructor(props){
      super(props)
      this.state = { body: '', imageUrl: "", imageFile: null  }
      this.handleInput = this.handleInput.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleUpload = this.handleUpload.bind(this)
      this.triggerModal = this.triggerModal.bind(this)
   }
 
   scrollToBottom() {
      this.messagesEnd.scrollIntoView();
   }

   componentDidMount() {
      this.channel = App.cable.subscriptions.create({
         channel: 'MessagesChannel',
         id: this.props.currentChannelId
      },
      {
        received: (data) => {
          this.props.receiveMessage(data)
        },
      })

      this.scrollToBottom();
   }
   
   componentDidUpdate() {
      this.scrollToBottom();
   }

   triggerModal(message) {
      let that = this
      return () => {
         that.props.openModal('UPDATE_MESSAGE')
         that.props.receiveUpdate(message)
      }
   }

   handleInput(e){

      this.setState({body: e.currentTarget.value})
   }

   handleSubmit(e){
      e.preventDefault()
      
      if (this.state.imageFile) {
         const message = new FormData()
         message.append( 'message[author_id]', this.props.currentUserId )
         message.append( 'message[channel_id]', this.props.currentChannelId ) 
         message.append( 'message[body]', this.state.body )
         message.append( 'message[photo]', this.state.imageFile )
         this.props.createMessage(this.props.currentChannelId, message)
      } else {
         let message = {
            userId: this.props.currentUserId,
            body: this.state.body,
            channelId: this.props.currentChannelId
         }
         this.channel.send(message)
      }

      this.setState({ body: '', imageUrl: "", imageFile: null })
   }

   handleUpload(e) {
      const reader = new FileReader();
      const file = e.currentTarget.files[0];
      reader.onloadend = () => {
         this.setState({ imageUrl: reader.result, imageFile: file });

      }

      if (file) {
         reader.readAsDataURL(file);
      } else {
         this.setState({ imageUrl: "", imageFile: null });
      }
   }
   render() {

      const messages = Object.values(this.props.messages[this.props.currentChannelId]);


      const users = this.props.users

         return (
         <div className="message-shell-outside">
            <Modal />
            <div className="message-shell">
               <ul>  
                  {  messages ? 
                        messages.map( message => (
                           <MessageShow 
                              key={message.id}
                              message={message}
                              user={ users[message.author_id]}
                              updateMessage={ this.triggerModal(message) }/>
                        )) : null
                  }
               </ul>
               <div 
                  style={{ float:"left", clear: "both", visibility: "hidden", height: 0 }}
                  ref={(el) => { this.messagesEnd = el; }}>
               </div>
            </div>
            <form onSubmit={this.handleSubmit}>
               <div className='message-container'>
                  <input type="file"
                     onChange={this.handleUpload}
                     style={ {display: 'none'} }
                  />
                  {
                     this.state.imageUrl ? 
                        (<img src={this.state.imageUrl} className="post-image-upload"/>) :
                        null
                  }
               <input
                  className="message-input-box"
                  type="textarea" 
                  onInput={this.handleInput}
                  placeholder='Message'
                  value={this.state.body}/>
               </div>
               {/* <button>Click</button> */}
            </form>
         </div>
      )
   }
}
