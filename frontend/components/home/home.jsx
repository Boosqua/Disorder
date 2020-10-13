import React from 'react'

export default class Home extends React.Component {
   componentDidMount() {
      this.props.fetchUser(this.props.user.id)
   }

   render() {
      return (
         <div>
            { `welcome back ${this.props.user.username}` }
            <button onClick={this.props.logout}>Log out</button>
         </div>
      )
   }
}