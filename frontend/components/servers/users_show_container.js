import { connect } from "react-redux";
import UsersShow from './users_show'
import { updateUser } from '../../actions/user_actions'

const mapStateToProps = (state, ownProps) => ({
   users: Object.values(state.ui.serverMembers[state.session.currentServerId])
})

const mapDispatchToProps = (dispatch) => ({
   updateUsername: user => dispatch(updateUser(user))
})

export default connect( mapStateToProps, mapDispatchToProps )(UsersShow)