import React from 'react';
import MessageShow from './message_show'
export default class MessageIndex extends React.Component {
   constructor(props){
      super(props)
      this.state = { body: ''}
      this.handleInput = this.handleInput.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
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
      // debugger
   }
   handleInput(e){
      // debugger
      this.setState({body: e.currentTarget.value})
   }
   // sendMessage(content){
   //    debugger
   //    const data = { channelId, userId, body }
   //    this.channel.send(content)
   // }
   handleSubmit(e){
      e.preventDefault()
      let message = {
         userId: this.props.currentUserId,
         body: this.state.body,
         channelId: this.props.currentChannelId
      }
      this.channel.send(message)
      // debugger
   }


   render() {
      const { messages } = this.props;


         return (
         <div className="message-shell">
            <div>
               <ul>  
                  {  messages ? 
                        messages.map( message => (
                           <MessageShow 
                              key={message.id}
                              message={message}/>
                        )) : null
                  }
               </ul>
            </div>
            <form onSubmit={this.handleSubmit}>
               <input type="text" onInput={this.handleInput} value={this.state.body}/>
               <button>Click</button>
            </form>
         </div>
      )
   }
}
