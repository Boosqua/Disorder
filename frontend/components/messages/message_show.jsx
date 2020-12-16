import React from 'react'

export default class MessageShow extends React.Component {

   render() {
      const { message, user, updateMessage } = this.props
      const icons = [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon]
      return (
         <li 
            className='message-list'
            >
            <div className='user-img-wrapper'>
               <div className='user-img'>
                  <img 
                     className='user-img-icon'
                     src={icons[user.user_image]}/>
               </div>
            </div>
            <div className='message-outside'>
               <div className='message-author'>{user.username}                
               {
                  updateMessage ? 
                  <img 
                  src="https://boosqua-disorder-dev.s3-us-west-1.amazonaws.com/please-edit-message.png"
                  onClick={updateMessage}
                  id="edit-icon"/> :
                  null
               }
               </div>
               { 
                  message.photoUrl ? 
                  <img src={message.photoUrl} id="message-photo"/> :
                  null
                  
               }
               <div className='message-body'>
                  {message.body}
               </div>
            </div>
         </li>
      )
   }
}