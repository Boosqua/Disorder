
import React, { Component } from "react"

export default class Testing extends Component {
   constructor(){
      super()
   }
   //props size, text, image, hover ? 
   //props.image or wrap around text?
   render(){
      const iconStyle = Object.assign({
         width: '100px',
         height: '100px',
      }, this.props)
      return (
         <div 
         className={this.props.onHover ? "ibc-h" : 'ibc'} 
         id={this.props.link ? "link" : ''} 
         style={iconStyle}> 
            <div className={this.props.image ? "ibi" : "ibt"}>
               {
                  this.props.image ? 
                     <img src={this.props.image}/> :
                     this.props.text
               }
            </div>
         </div>
      )
   }
}