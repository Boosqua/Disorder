import React from 'react';
import MessageShow from './message_show'
import Modal from '../modal'
export default class MessageIndex extends React.Component {
   constructor(props){
      super(props)
      this.state = { body: ''}
      this.handleInput = this.handleInput.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.triggerModal = this.triggerModal.bind(this)
   }
 
   scrollToBottom() {
      this.messagesEnd.scrollIntoView();
   }

   componentDidMount() {
      this.channel = this.props.cable.subscriptions.create({
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
         console.log('no bugs')
         console.log(message.body)
         debugger
         that.props.openModal('hi')
      }
   }

   handleInput(e){

      this.setState({body: e.currentTarget.value})
   }

   handleSubmit(e){
      e.preventDefault()
      let message = {
         userId: this.props.currentUserId,
         body: this.state.body,
         channelId: this.props.currentChannelId
      }
      this.channel.send(message)
      this.setState({ body: ''})
      // debugger
   }


   render() {
      // debugger
      const messages  = this.props.messages[this.props.currentChannelId];


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
