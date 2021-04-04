import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors } from "../../actions/error_actions"
export default function Errors(){
   const errors = useSelector( state => state.errors.user)
   const dispatch = useDispatch()
   if(errors.length > 0){
      setTimeout(() => dispatch(clearErrors()), 3000)
   }
   return (
      errors.length > 0 ? 
      <div className="errorcontainer">
         <div className="errortext">
            {errors.join(" ").toUpperCase()}
         </div>
         <div className="errortimer"></div>
      </div>
      : null
   )
}