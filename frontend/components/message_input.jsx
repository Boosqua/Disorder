import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

export default function MessageInput(props) {
   const channelId = useSelector(state => state.session.channelId)
   const userId = useSelector( state => state.session.currentUser.id)
   const imageUpload = useRef(null)
   const [message, setMessage] = useState("")
   const {id} = useParams()
   const friendIds = useSelector( state => state.entities.friends )
   if( id === "@me" && friendIds.length === 0 ) return null
   function handleSubmit(e){
      let messageObject = {
         userId: userId,
         imageable_id: channelId,
         imageable_type: "Channel",
         body: message
      }
      props.channel.send(messageObject)
      setMessage("")
   }

   function handleChange(e) {
      let message = e.currentTarget.value;
      if(message[message.length - 1] === "\n") {
         handleSubmit(e)
      } else {
         setMessage(message)
      }
   }
   return <div className="input">
      <div className="span-container">
      <div className="circle" onClick={() => {imageUpload.current.click()}}>
         +
      </div>
      <span className="mifc">
         <form >
            <textarea className="mif" onChange={handleChange} value={message}/>
            <input type="file"
                     style={ {display: 'none'} }
                     ref={imageUpload}
                  />
         </form>
      </span>
      </div>
   </div>
}