import React from 'react'

export default class MessageShow extends React.Component {

   render() {
      const { message } = this.props

      return (
         <li>
            <div>{message.author_id}</div>
            <div>
               {message.body}
            </div>
         </li>
      )
   }
}