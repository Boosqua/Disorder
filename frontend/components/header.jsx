import React from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from "react-router"
export default function Header(props){
   const {id} = useParams()
   const pageName = useSelector((state) => {
      if(id === "@me") {
         return state.session.currentUser.username
      } else {
         return state.entities.servers[id].name
      }
   })
   return (
      <div className="header">
         <div className="ht">
            <div className="htt">
            {pageName}
            </div>
         </div>
         <div className="hc">
            Content
         </div>
      </div>
   )
}