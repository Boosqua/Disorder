import { connect } from 'react-redux'
import Home from './home'
import { fetchUser, logout } from '../../actions/session_actions'
import { fetchServers } from '../../actions/server_actions'
import { fetchChannels } from '../../actions/channel_actions'

const mapStateToProps = (state, ownProps) => ({
   user: state.entities.users[state.session.currentUserId],
   serverId: state.session.currentServerId,
   servers: state.entities.servers
})

const mapDispatchToProps = dispatch => ({
   fetchUser: userId => dispatch(fetchUser(userId)),
   fetchServers: userId => dispatch(fetchServers(userId)),
   fetchChannels: serverId => dispatch(fetchChannels(serverId)),
   logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)