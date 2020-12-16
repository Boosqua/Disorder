import React from 'react';

export default class UserShow extends React.Component {
   render() {
      const users = this.props.users
      const icons = [window.redIcon, window.yellowIcon, window.greyIcon, window.greenIcon]

      return (
         <div className='users-show'>
            <ul>
               {
                  users.map( (user, index) => {
                     let username = user.username;
                     return (
                        <li key={index} className='user-show'>
                           <div className='user-img-wrapper'>
                              <div className='user-img'>
                                 <img 
                                    className='user-img-icon'
                                    src={icons[user.user_image]}/>
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