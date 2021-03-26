
import React, {  useState } from "react"
import Modal from "./reusable/modal"
export default function Testing(props) {
   const [modal, setModal] = useState(false)
   const [coor, setCoor] = useState(null)

   return (
      <div className="testing">
         <button onClick={ e => {
            e.preventDefault
            setCoor({x: e.clientX, y: e.clientY})
            setModal(!modal)
            }}> click me!</button>
            <Modal show={modal} 
            closeModal={() => setModal(false)} 
            position={coor}
            > <div>LOL</div></Modal>
      </div>
   )
   
}