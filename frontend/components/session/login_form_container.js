import { login, clearErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';
import SessionForm from './session_form';


const mapStateToProps = (state, ownProps) => {
   return {
      errors: state.errors,
      formType: 'Welcome back!',
      buttonText: 'Log In!'
   }
}

const mapDispatchToProps = dispatch => {
   return {
      processForm: (formUser) => dispatch(login(formUser)),
      clearErrors: () => dispatch(clearErrors()),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);