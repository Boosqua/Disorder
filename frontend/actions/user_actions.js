import * as APIUtil from '../util/users_api_util';
import {receiveErrors} from "./error_actions"
import {logoutCurrentUser} from "./session_actions"
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUsers = users => ({
   type: RECEIVE_USERS,
   users
});

export const receiveUser = user => ({
   type: RECEIVE_USER,
   user
});


export const fetchUsers = () => dispatch => (
   APIUtil.fetchUsers()
      .then( users => dispatch(receiveUsers(users)) )
      .fail( error => dispatch(receiveErrors(error)))
);

export const fetchUser = userId => dispatch => (
   APIUtil.fetchUser(userId)
      .then(user => dispatch(receiveUser(user)))
      .fail( error => dispatch(receiveErrors(error)))
);

export const updateUser = user => dispatch => (
   APIUtil.updateUser(user).then((user) => dispatch(receiveUser(user))).fail( error => dispatch(receiveErrors(error)))
);

export const deleteUser = userId => dispatch => (
   APIUtil.deleteUser(userId).then(() => dispatch(logoutCurrentUser())).fail( error => dispatch(receiveErrors(error)))
)