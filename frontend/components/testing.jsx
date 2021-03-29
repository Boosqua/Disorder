
import React, {  useState } from "react"
import { useDispatch } from "react-redux"
import {fetchFriends } from "../actions/friend_actions"

export default function Testing(props) {
   const dispatch = useDispatch()

   return (
      <div className="testing">
         <button
         onClick={(e) => {
            e.preventDefault()
            fetchFriends()(dispatch)
         }}>receive friends</button>
      </div>
   )
   
}