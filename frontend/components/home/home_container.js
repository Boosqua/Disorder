import { connect } from 'react-redux'
import Home from './home'
import { fetchUser, logout } from '../../actions/session_actions'

const mapStateToProps = (state, ownProps) => ({
   user: state.entities.users[state.session.currentUserId]
})

const mapDispatchToProps = dispatch => ({
   fetchUser: userId => dispatch(fetchUser(userId)),
   logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)