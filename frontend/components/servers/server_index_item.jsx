import React from 'react';
import { Link } from 'react-router-dom';

export default class ServerIndexItem extends React.Component {
   constructor(props){
      super(props)
      this.handleClick = this.handleClick.bind(this)
   }
   handleClick(e) {
      e.preventDefault();
      this.props.fetchChannels(this.props.server.id)
   }
   serverImage(server) {
      if (server.image) {
         return <img 
            className='server-image'
            src={server.image}/>
      } else {
         let words = server.name.split(" ");
         let img = '';

         words.forEach( word => img += `${word[0].toUpperCase()}`);
         return (
                  <div className='server-image-text'>
                     {img}
                  </div>
         )
      }
   }
   

   render() {
      let { server, handleServerChange } = this.props;

      return (
         <li 
            className='server-link'
            onClick={ this.handleClick }
            >
            <div className='server-image-wrapper'>
               <div className='server-bg'>
                  { this.serverImage(server) }  
              </div>
           </div>
         </li>
      )
   }
}