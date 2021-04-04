import React from "react"
import Modal from "./reusable/modal"
import IconButton from "./reusable/icon_button"
export default function Loading(){
   const icon = window.redIcon

   return(
      <Modal show="true" closeModal={() => {}}>
         <div className="loading">
            <IconButton image={icon} animate={true}></IconButton>
            <div style={{margin: "15px", fontStyle: "italic"}}>loading...</div>
         </div>
      </Modal>
   )
}