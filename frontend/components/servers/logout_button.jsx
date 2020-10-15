import React from 'react';

const LogoutButton = (props) => {
   const { logout } = props;

   return (
      <li 
         className='server-link'
         onClick={ logout }
         >
         <div className='server-image-wrapper'>
            <div className='server-bg'>
               <img 
                  className='server-image-logout'
                  src={window.logoutUrl}/>
            </div>
         </div>
      </li>
   )
}

export default LogoutButton;