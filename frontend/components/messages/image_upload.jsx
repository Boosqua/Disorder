import React, {useState} from "react"
import Modal from "../reusable/modal"
export default function testing(props){
   const [modal, setModal] = useState(!!props.image.imageUrl)
   return (
      <div>
      <Modal show={modal} closeModal={  () => setModal(false)}>
         <div className="imagemc">
            <div className="modal-testing" >
               <img className={"imagetest"}src={props.image.imageUrl} alt=""/>
            </div>
            <div className="button-container">
            <div className="modalbutton" onClick={() => props.handleSubmit()}>confirm</div><div className="modalbutton" onClick={() => props.setImage({imageUrl: null, imageFile: null})}>cancel</div>
            </div>
         </div>
      </Modal>
      </div>
   )
}