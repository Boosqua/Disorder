import { connect } from 'react-redux';
import UpdateMessageComponent from './update_message';
import {closeModal} from '../../actions/modal_actions'
import { removeUpdate} from '../../actions/update_actions'
import { updateMessage } from '../../actions/message_actions'

const mapStateToProps = (state) => ({
   message: state.ui.update
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  removeUpdate: () => dispatch(removeUpdate()),
  updateMessage: (messageId, message) => dispatch(updateMessage(messageId, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMessageComponent)