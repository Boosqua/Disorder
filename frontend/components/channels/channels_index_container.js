import { connect } from 'react-redux';
import {
   fetchChannels,
   fetchChannel,
   createChannel,
   updateChannel,
   removeChannel,
   receiveErrors,
   clearErrors
} from '../../actions/channel_actions';
import ChannelsIndex from './channels_index'

const mapStateToProps = (state, ownProps) => ({
   allChannels: state.entities.channels
});

const mapDispatchToProps = dispatch => ({
   fetchChannels: (serverId) => dispatch(fetchChannels(serverId)),
   fetchChannel: (serverId, channelId) => dispatch(fetchChannel(serverId, channelId)),
   createChannel: (serverId, channel) => dispatch(createChannel(serverId, channel)),
   updateChannel: (serverId, channel) => dispatch(updateChannel(serverId, channel)),
   removeChannel: (serverId, channelId) => dispatch(removeChannel(serverId, channelId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsIndex);