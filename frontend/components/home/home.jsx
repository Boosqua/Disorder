import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
//   Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ServersIndexContainer from '../servers/servers_index_container';
import ServersShowContainer from '../servers/server_show_container'

export default class Home extends React.Component {
   componentDidMount() {
      this.props.fetchUser(this.props.user.id)
      this.props.fetchServers(this.props.user.id)
   }

   render() {
      return Object.keys(this.props.servers).length > 0 ? (
         <div className='mount-component'>
            <button 
               onClick={this.props.logout} 
               className='logout-button'>
               Log out
            </button>
            <ServersIndexContainer user={this.props.user}/>
            <ServersShowContainer />
            {/* <Switch>
               <Route to={`/server/:serverId`} component={ServersShowContainer} />
            </Switch> */}
         </div>
      ) : null
   }
}