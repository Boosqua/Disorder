
import React, {  useState } from "react"
import { useDispatch } from "react-redux"
import {createServerMember, deleteServerMember} from '../actions/server_actions'
export default function Testing(props) {
   const dispatch = useDispatch()

   return (
      <div className="testing">
         <button
         onClick={(e) => {
            e.preventDefault()
            createServerMember({server_id: 4, user_id: 1})(dispatch)
         }}>addServer</button>
         <button
         onClick={ (e) => {
            e.preventDefault()
            deleteServerMember({server_id: 4, user_id: 1})(dispatch)
         }}
         >deleteServer</button>
      </div>
   )
   
}