import { connect } from 'react-redux';
import { fetchServer, clearErrors } from '../../actions/server_actions';
import ServersShow from './servers_show';


// const mapStateToProps = (state, ownProps) => ({
//    server: state.entities.servers[state.session.currentServerId]
// })
const mapStateToProps = (state, ownProps) =>{ 
   // debugger
   return ({
   channels: state.entities.channels[state.session.currentServerId]
})}

const mapDispatchToProps = (dispatch) => ({
  fetchServer: (userId, serverId) => dispatch(fetchServer(userId, serverId)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServersShow)