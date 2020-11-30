import React from 'react'

export default class MessageShow extends React.Component {

   render() {
      const { message, user } = this.props

      return (
         <li className='message-list'>
            <div className='user-img-wrapper'>
               <div className='user-img'>
                  <img 
                     className='user-img-icon'
                     src={window.tempIcon}/>
               </div>
            </div>
            <div className='message-outside'>
               <div className='message-author'>{user.username}</div>
               <div className='message-body'>
                  {message.body}
               </div>
            </div>
         </li>
      )
   }
}