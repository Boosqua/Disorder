
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
      let className;
       if(this.props.selected){
               className = 'ibcs'
         } else {
         className = this.props.onHover ? "ibc-h" : 'ibc'
         }
      return (
         <div 
         className={className}
         id={this.props.link ? "link" : ''}
         style={iconStyle}> 
         {
            this.props.alert ? 
               (<div className="alert"></div>) :
               null
         }
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