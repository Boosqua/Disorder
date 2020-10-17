import React from 'react';
import MessageShow from './message_show'
export default class MessageIndex extends React.Component {
   componentDidMount() {
      // debugger
      this.messages = this.getMessages()
   }
   getMessages() {
      let that = this
      setInterval(() => {
         that.props.fetchMessages(this.props.currentChannelId)
      }, 1000)
   }
   componentWillUnmount(){
      clearInterval(this.messages)
   }
   render() {
      const { messages } = this.props;


         return (
         <div className="message-shell">
            <div>
               <ul>  
                  {  messages.length > 0 ? 
                        messages.map( message => (
                           <MessageShow 
                              key={message.id}
                              message={message}/>
                        )) : null
                  }
               </ul>
            </div>
         </div>
      )
   }
}
