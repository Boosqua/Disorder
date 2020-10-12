import { signup } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionForm from "./session_form";

const mapStateToProps = (state, ownProps) => ({
    errors: state.errors,
    formType: "Sign up",
});

const mapDispatchToProps = dispatch => ({
    processForm: (formUser) => dispatch(signup(formUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
