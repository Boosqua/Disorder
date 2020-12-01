import React from 'react';

export default class UpdateMessage extends React.Component {
   constructor(props){
      super(props)
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = { body: props.message.body}
   }

   handleInput(e) {
      this.setState({ body: e.currentTarget.value })
   }

   handleSubmit(e) {
      e.preventDefault();
      console.log('submit') 
      this.props.closeModal()
      this.props.removeUpdate()
   }

   render(){
      return (
         <div className='message-update-container'>
            {/* <form onSubmit={this.handleSubmit}> */}
            <form >
               <div className='span-container'>
               <span
                  contentEditable="true" 
                  className='message-update-text'
                  type="textarea" 
                  // value={this.state.body}
                  onChange={this.handleInput}>
                     {this.state.body}
               </span>
               </div>
            <div className='message-button-container'>
                  <button className='message-update-button' onClick={this.handleSubmit}>
                     Update Message
                  </button>
                  <button className='message-update-button'>
                     Delete Message
                  </button>
            </div>
            </form>
         </div>
      )
   }
}