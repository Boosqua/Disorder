import { connect } from 'react-redux';
import { fetchMessages } from '../../actions/message_actions';
import MessageIndex from './message_index'

const mSTP = (state, ownProps) => ({
   messages: Object.values(state.entities.messages)
});

const mDTP = dispatch => ({
   fetchMessages: channelId => dispatch(fetchMessages(channelId))
});

export default connect(mSTP, mDTP)(MessageIndex)