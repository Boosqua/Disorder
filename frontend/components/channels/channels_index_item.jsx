import React from 'react'

const ChannelsIndexItem = (props) => {

   return(
      <li>
         <div 
            className="channel-index-item-outside"
            onClick={props.changeCurrentChannel}
            >
            <div className="channel-index-item">
            {props.channel.name}
            </div>
         </div>
      </li>
   )
}

export default ChannelsIndexItem;