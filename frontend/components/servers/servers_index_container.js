import { connect } from 'react-redux';
import { fetchServers, clearErrors } from '../../actions/server_actions';
import ServersIndex from './servers_index';

const mapStateToProps = (state, ownProps) => ({
   servers: Object.values(state.entities.servers),
   errors: state.errors.servers
})

const mapDispatchToProps = dispatch => ({
   fetchServers: () => dispatch(fetchServers()),
   clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(ServersIndex)