import * as APIUtil from '../util/users_api_util';

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
);

export const fetchUser = userId => dispatch => (
   APIUtil.fetchUser(userId)
      .then(user => dispatch(receiveUser(user)))
)

export const uploadPhoto = (userId, file) => (dispatch) => (
   APIUtil.uploadPhoto(userId, file)
      .then((user) => dispatch(receiveUser(user)))
      .catch((err) => console.log(err))
)