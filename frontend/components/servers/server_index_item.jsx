import React from 'react';

const ServerIndexItem = props => {
   let { server } = props;

   return (
      <li className='server-link'>
         { server.name }
      </li>
   )
}

export default ServerIndexItem;