import { connect } from 'react-redux';
import UpdateMessage from './update_message';
import {closeModal} from '../../actions/modal_actions'
import { removeUpdate} from '../../actions/update_actions'

const mapStateToProps = (state) => ({
   message: state.ui.update
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  removeUpdate: () => dispatch(removeUpdate())
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMessage)