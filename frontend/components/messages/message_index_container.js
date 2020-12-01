import { connect } from 'react-redux';
import { fetchMessages, receiveMessage } from '../../actions/message_actions';
import MessageIndex from './message_index'
import {openModal} from '../../actions/modal_actions'

const mSTP = (state, ownProps) => {
   // debugger
   return ({
   messages: state.entities.messages,
   currentUserId: state.session.currentUserId,
   users: state.entities.users
})};
// const mSTP = (state, ownProps) => ({
//    messages: Object.values(state.entities.messages), 
//    currentUserId: state.session.currentUserId
// });

const mDTP = (dispatch) => ({
  fetchMessages: (userId) => dispatch(fetchMessages(userId)),
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(mSTP, mDTP)(MessageIndex)