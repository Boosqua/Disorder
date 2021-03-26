import React, { useState } from 'react'
export default function MessageInput(props) {
   const [message, setMessage] = useState("")
   function handleSubmit(e){
      e.preventDefault();
   }
   return <div className="input">
      <form onSubmit={handleSubmit}></form>
   </div>
}