import { connect } from "react-redux";
import ServerCrud from "./server_crud";
import {
   updateServer
} from "../../actions/server_actions"

const mapStateToProps = (state) => ({
   servers: state.entities.servers,
   users: state.entities.users,
   channels: state.entities.channels,
   currentUserId: state.session.currentUser,
   currentServerId: state.session.currentServerId
})

const mapDispatchToProps = (dispatch) => ({
   updateServer: (userId, server) => dispatch(updateServer(userId, server))
})

export default connect(mapStateToProps, mapDispatchToProps)(ServerCrud);