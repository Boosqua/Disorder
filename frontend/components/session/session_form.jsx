import React from 'react';
import { Link } from 'react-router-dom';
import ShowErrorMessages from '../errors/show_error_messages'

const _USER = {
         username: '',
         password: '',
         email: ''
      }

export default class SessionForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = _USER
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.demoLogin = this.demoLogin.bind(this)
   }
   componentDidMount() {
      this.props.clearErrors()
   }

   handleInput(type) {
      return (e) => {
         this.setState({ [type]: e.currentTarget.value })
      }
   }

   handleSubmit(e) {
      e.preventDefault();
      const user = Object.assign({}, this.state);
      this.props.clearErrors();
      this.props.processForm(user);
      this.setState({
        password: ""
      });
   }

   demoLogin(e){
      e.preventDefault();
      this.props.clearErrors();
      let login = this.props.login ? this.props.login : this.props.processForm;
      let that = this;
      let count = 0;
      let demo = 'testUserpassword';
      if (this.demo) return;
      this.setState(_USER);
      this.demo = setInterval(() => {
         let type = count < 8 ? 'username' : 'password';
         that.setState({ [type]: that.state[type] + demo[count]});
         count++;
         if (count === 16) {
            clearInterval(this.demo)
            login({
               username: "testUser",
               password: "password"
            })
         }
      }, 50)
   }


   render(){
      return (
         <div className='session-outside'>
         <div className="session-form">
            <form onSubmit={this.handleSubmit}>
            <h2 className="form-header">{ this.props.formType }</h2>
               {
                  this.props.formType === 'Sign Up!' ? 
                     (
                     <label className='session-input-label'>Email
                     <br/>
                        <input type="text" 
                           value={this.state.email} 
                           onInput={this.handleInput('email')}/>
                     </label>) :
                     <p className='session-input-label'>We're so happy to see you again!</p>
               }
               <br/>
               <label className='session-input-label'> Username
               <br/>
                  <input type="text" 
                     value={this.state.username} 
                     onInput={this.handleInput('username')}/>
               </label>
               <br/>
               <label className='session-input-label'> Password
               <br/>
                  <input type="password" 
                     value={this.state.password} 
                     onInput={this.handleInput('password')}/>
               </label>
               <br/>
               <ShowErrorMessages errors={this.props.errors}/>
              
               {
                  this.props.formType !== 'Sign Up!' ? 
                  <div className='session-links'>
                     <Link to='/signup'>Need an account?</Link>
                     <a className='demo-link' onClick={this.demoLogin}>
                        Demo Login
                     </a> 
                  </div> :
                  <Link to='/login'>Log in</Link>
               }
               <button className='session-button'>{this.props.buttonText}</button>
            </form>
         </div>
         </div>
      )
   }
}