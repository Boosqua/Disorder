import * as APIUtil from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT-USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = (currentUser) =>{
    
    return {
        type: RECEIVE_CURRENT_USER,
        currentUser
    };
};

export const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER,
    };
};

export const receiveErrors = (errors) => {
    return{
        type: RECEIVE_ERRORS,
        errors
    };
};
// Promise callbacks — .done(), .fail(), .always(), and .then() — are invoked, in the order they are registered.
export const fetchUser = (userId) => dispatch => (
    APIUtil.fetchUser(userId)
        .then((user) => dispatch(receiveCurrentUser(user)))
)
export const signup = (formUser) => (dispatch) => {
    return (
        APIUtil.signup(formUser)
            .then((user)=>{dispatch(receiveCurrentUser(user))})
            .fail((errors)=>{dispatch(receiveErrors(errors))})
    );
};

export const logout = () => (dispatch) => { //good working with you :D
    return APIUtil.logout() // same!! just had to finish up our fail catches 
        .then(() => {dispatch(logoutCurrentUser())})
        .fail((errors) => {dispatch(receiveErrors(errors))});
};

export const login = formUser => (dispatch) => {
    return(
        APIUtil.login(formUser)
        .then((user)=> {dispatch(receiveCurrentUser(user))})
        .fail((errors) => {dispatch(receiveErrors(errors))})
    )
}