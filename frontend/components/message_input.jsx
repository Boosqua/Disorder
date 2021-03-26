import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function MessageInput(props) {
   const channelId = useSelector(state => state.session.channelId)
   const userId = useSelector( state => state.session.currentUser.id)
   const imageUpload = useRef(null)
   const [message, setMessage] = useState("")

   function handleSubmit(e){
      let messageObject = {
         userId: userId,
         channelId: channelId,
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
                     onChange={() => console.log("hello")}
                     style={ {display: 'none'} }
                     ref={imageUpload}
                  />
         </form>
      </span>
      </div>
   </div>
}