import { signup, login, clearErrors } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionForm from "./session_form";


const mapStateToProps = (state, ownProps) => ({
    errors: state.errors,
    formType: "Sign Up!",
    buttonText: 'Sign Up!'
});

const mapDispatchToProps = dispatch => ({
    processForm: (formUser) => dispatch(signup(formUser)),
    login:  (formUser) => dispatch(login(formUser)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
