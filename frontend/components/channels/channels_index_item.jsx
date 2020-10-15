import React from 'react'

const ChannelsIndexItem = (props) => {

   return(
      <li>
         <div>{props.channel.name}</div>
      </li>
   )
}

export default ChannelsIndexItem;