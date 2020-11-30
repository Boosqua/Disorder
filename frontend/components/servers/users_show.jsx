import React from 'react';

export default class UserShow extends React.Component {

   render() {
      const users = this.props.users

      return (
         <div className='users-show'>
            <ul>
               {
                  users.map( (user, index) => {
                     let username = user.username;
                     return (
                        <li id={index} className='user-show'>
                           <div className='user-img-wrapper'>
                              <div className='user-img'>
                                 <img 
                                    className='user-img-icon'
                                    src={window.tempIcon}/>
                              </div>
                           </div>
                           <div className='message-author'>{username}</div>
                        </li>
                     )
                  })
               }
            </ul>
         </div>
      )
   }
}