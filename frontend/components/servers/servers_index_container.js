import { connect } from 'react-redux';
import { fetchServer, clearErrors } from '../../actions/server_actions';
import { fetchChannels } from '../../actions/channel_actions';
import ServersIndex from './servers_index';

const mapStateToProps = (state, ownProps) => ({
   servers: Object.values(state.entities.servers),
   currentServerId: state.session.currentServerId,
   userId: state.session.currentUserId,
   errors: state.errors.servers
})

const mapDispatchToProps = dispatch => ({
   fetchServer: (userId, serverId) => dispatch(fetchServer(userId, serverId)),
   fetchChannels: (serverId) => dispatch(fetchChannels(serverId)),
   clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(ServersIndex)