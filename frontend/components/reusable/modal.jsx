import React, { useRef } from 'react';

export default function Modal(props){
   //need props closeModal show position
   function handleModal(e) {
      if( e.currentTarget === e.target ){
         props.closeModal()
      }
   }

   return props.show ? 
      <div className="modal" onClick={handleModal}><span className="modalcontent" style={{left: props.position.x, top:props.position.y}}> {props.children} </span></div>
      : null
}