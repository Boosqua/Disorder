import React from 'react';

export default class UpdateMessage extends React.Component {
   constructor(props){
      super(props)
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      // this.spanRef = React.createRef();
      this.state = { body: props.message.body}
      this.val = props.message.body
   }

   handleInput(e) {
      // debugger
      this.setState({ body: e.currentTarget.value })
      // const { innerText } = e.target;
      // if (this.val !== innerText) {
      //    this.spanRef.innerText = innerText;
      //    this.val = innerText;
      // }
   }
   handleDelete(e){
      e.preventDefault();
      this.props.deleteMessage(this.props.message)
      this.props.closeModal()
      this.props.removeUpdate()
   }
   handleSubmit(e) {
      e.preventDefault();
      // debugger
      this.props.updateMessage(this.props.message.id, this.state)
      this.props.closeModal()
      this.props.removeUpdate()
   }

   render(){
      return (
         <div className='message-update-container'>
            {/* <form onSubmit={this.handleSubmit}> */}
            <form >
               <div className='span-container'>
               <input
                  className='message-update-text'
                  type="textarea" 
                  // value={this.state.body}
                  onInput={this.handleInput}
                  value={this.state.body}
                  />
               </div>
            <div className='message-button-container'>
                  <button className='message-update-button' onClick={this.handleSubmit}>
                     Update Message
                  </button>
                  <button className='message-update-button' onClick={ this.handleDelete }>
                     Delete Message
                  </button>
            </div>
            </form>
         </div>
      )
   }
}