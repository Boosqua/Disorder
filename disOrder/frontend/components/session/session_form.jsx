import React from 'react';
import { Link } from 'react-router-dom';
import ShowErrorMessages from '../errors/show_error_messages'
export default class SessionForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         email: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.demoLogin = this.demoLogin.bind(this)
   }

   handleInput(type) {
      // debugger
      return (e) => {
         this.setState({ [type]: e.currentTarget.value })
      }
   }

   handleSubmit(e) {
      e.preventDefault();
      const user = Object.assign({}, this.state);
      this.props.processForm(user);
      this.setState({
        username: "",
        password: "",
        email: ""
      });
   }

   demoLogin(e){
      e.preventDefault();
      this.props.processForm({
         username: "testUser",
         password: "password"
      })
      
   }

   render(){
      return (
         <div>{ this.props.formType }
            <form className="session-form" onSubmit={this.handleSubmit}>
               {
                  this.props.formType === 'Sign up' ? 
                     (<label> Email:
                        <input type="text" 
                           value={this.state.email} 
                           onInput={this.handleInput('email')}/>
                     </label>) :
                     ""
               }
               <label> Username:
                  <input type="text" 
                     value={this.state.username} 
                     onInput={this.handleInput('username')}/>
               </label>
               <label> Password:
                  <input type="password" 
                     value={this.state.password} 
                     onInput={this.handleInput('password')}/>
               </label>
               <br/>
               <ShowErrorMessages errors={this.props.errors}/>
               {
                  this.props.formType !== 'Sign up' ? 
                  (<div><Link to='/signup'> Need an account? </Link> 
                  <button onClick={this.demoLogin}>Demo Login</button></div>) :
                  <Link to='/login'>Log in</Link>
               }
               <br/>
               <button>Submit</button>
            </form>
         </div>
      )
   }
}