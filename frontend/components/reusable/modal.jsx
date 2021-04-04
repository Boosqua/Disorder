import React, { useRef } from 'react';

export default function Modal(props){
   //need props closeModal show position
   function handleModal(e) {
      if( e.currentTarget === e.target ){
         props.closeModal()
      }
   }
   
   const {x,y} = props.position ? props.position :
   {x: 0, y: 0}
   const xStyle = window.innerWidth - x < 200 ?
      {left: x - 200}
      : {left: x}
   const yStyle = window.innerHeight - y < 200 ? 
      {top: y - 200}
      :{top: y}
   const style = x + y === 0 ? {} : Object.assign(xStyle, yStyle, {position: "absolute"})

   return props.show ? 
      <div className="modal" onClick={handleModal}><span onClick={handleModal} className="modalcontent" style={style}> {props.children} </span></div>
      : null
}