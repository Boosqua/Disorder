import { connect } from "react-redux";
import UsersShow from './users_show'

const mapStateToProps = (state, ownProps) => ({
   users: Object.values(state.ui.serverMembers[state.session.currentServerId])
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect( mapStateToProps, mapDispatchToProps )(UsersShow)