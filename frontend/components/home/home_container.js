import { connect } from 'react-redux'
import Home from './home'
import { fetchUser, logout } from '../../actions/session_actions'
import { receiveMessage, fetchMessages} from "../../actions/message_actions";
import { fetchServers, receiveCurrentServer } from '../../actions/server_actions'
import { fetchChannels } from '../../actions/channel_actions'
import { fetchUsers } from '../../actions/user_actions'
import { fetchServerMembers } from '../../actions/update_actions';

const mapStateToProps = (state, ownProps) => ({
   users: state.entities.users,
   user: state.session.currentUser,
   currentServerId: state.session.currentServerId,
   channels: state.entities.channels,
   servers: state.entities.servers,
   messages: state.entities.messages
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchServers: (userId) => dispatch(fetchServers(userId)),
  fetchChannels: (serverId) => dispatch(fetchChannels(serverId)),
  fetchMessages: (userId) => dispatch(fetchMessages(userId)),
  logout: () => dispatch(logout()),
  receiveCurrentServer: server => dispatch(receiveCurrentServer(server)),
  fetchServerMembers: (servers, users) => dispatch(fetchServerMembers(servers, users))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)