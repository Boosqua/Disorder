import { connect } from 'react-redux';
import { fetchMessages, receiveMessage } from '../../actions/message_actions';
import MessageIndex from './message_index'

// const mSTP = (state, ownProps) => {
//    return ({
//    messages: Object.values(state.entities.messages),
//    currentUserId: state.session.currentUserId
// })};
const mSTP = (state, ownProps) => ({
   messages: Object.values(state.entities.messages), 
   currentUserId: state.session.currentUserId
});

const mDTP = dispatch => ({
   fetchMessages: userId => dispatch(fetchMessages(userId)), 
   receiveMessage: message => dispatch(receiveMessage(message))
});

export default connect(mSTP, mDTP)(MessageIndex)