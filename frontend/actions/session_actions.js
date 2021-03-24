import * as APIUtil from "../util/session_api_util";
import {fetchServer} from '../util/server_api_util'
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
// export const RECEIVE_CURRENT_SERVER = 'RECEIVE_CURRENT_SERVER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT-USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

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

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export const fetchUser = (userId) => dispatch => (
    APIUtil.fetchUser(userId)
        .then((user) => dispatch(receiveCurrentUser(user)))
);



export const signup = (formUser) => (dispatch) => {
    return (
        APIUtil.signup(formUser)
            .then((user)=>{dispatch(receiveCurrentUser(user))})
            .fail((errors)=>{dispatch(receiveErrors(errors))})
    );
};

export const logout = () => (dispatch) => { 
    return APIUtil.logout() 
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