// import { connect } from "react-redux";
// import ServerCrud from "./server_crud";
// import {
//    updateServer
// } from "../../actions/server_actions"
// import {
//    updateChannel,
//    createChannel
// } from "../../actions/channel_actions"

// const mapStateToProps = (state) => ({
//    servers: state.entities.servers,
//    users: state.entities.users,
//    allChannels: state.entities.channels,
//    currentUserId: state.session.currentUser,
//    currentServerId: state.session.currentServerId
// })

// const mapDispatchToProps = (dispatch) => ({
//    updateServer: (userId, server) => dispatch(updateServer(userId, server)),
//    updateChannel: ( serverId, channel ) => dispatch(updateChannel( serverId, channel )),
//    createChannel: ( serverId, channel ) => dispatch(createChannel( serverId, channel ))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ServerCrud);