import { connect } from 'react-redux';
import { fetchMessages, receiveMessage, createMessage } from '../../actions/message_actions';
import MessageIndex from './message_index'
import {openModal} from '../../actions/modal_actions'
import {receiveUpdate} from '../../actions/update_actions'

const mSTP = (state, ownProps) => {

   return ({
   messages: state.entities.messages,
   currentUserId: state.session.currentUserId,
   users: state.entities.users,
})};


const mDTP = (dispatch) => ({
  fetchMessages: (userId) => dispatch(fetchMessages(userId)),
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  openModal: (modal) => dispatch(openModal(modal)),
  receiveUpdate: (message) => dispatch(receiveUpdate(message)),
  createMessage: (channelId, message) => dispatch(createMessage(channelId, message))
});

export default connect(mSTP, mDTP)(MessageIndex)