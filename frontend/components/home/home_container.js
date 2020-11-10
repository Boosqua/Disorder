import { connect } from 'react-redux'
import Home from './home'
import { fetchUser, logout } from '../../actions/session_actions'
import { fetchMessages, receiveMessage } from "../../actions/message_actions";
import { fetchServers } from '../../actions/server_actions'
import { fetchChannels } from '../../actions/channel_actions'

const mapStateToProps = (state, ownProps) => ({
   user: state.entities.users[state.session.currentUserId],
   serverId: state.session.currentServerId,
   servers: state.entities.servers,
   messages: state.entities.messages
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  fetchServers: (userId) => dispatch(fetchServers(userId)),
  fetchChannels: (serverId) => dispatch(fetchChannels(serverId)),
  fetchMessages: (userId) => dispatch(fetchMessages(userId)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)