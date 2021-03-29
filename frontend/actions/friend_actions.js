import * as APIUtil from "../util/friend_api_util"

export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const DELETE_FRIEND = "DELETE_FRIEND"

export const receiveFriends = friends => ({
   type: RECEIVE_FRIENDS,
   friends
})

export const receiveFriend = friend => ({
   type: RECEIVE_FRIEND,
   friend
})

export const deleteFriend = friend => ({
   type: DELETE_FRIEND,
   friend
})

export const fetchFriends = () => dispatch => (
   APIUtil.fetchFriends()
      .then(friends => dispatch(receiveFriends(friends)))
)

export const createFriend = (friendAId, friendBId) => (dispatch) => (
  APIUtil.createFriend(friendAId, friendBId)
   .then((friend) => dispatch(receiveFriend(friend)))
)

export const destroyFriend = (id) => (dispatch) => (
   APIUtil.deleteFriend(id)
      .then( friend => dispatch(deleteFriend(friend)))
)

export const RECEIVE_FRIEND_REQUESTS = "RECEIVE_FRIEND_REQUESTS";
export const RECEIVE_FRIEND_REQUEST = "RECEIVE_FRIEND_REQUEST";
export const DELETE_FRIEND_REQUEST = "DELETE_FRIEND_REQUEST";

export const receiveFriendRequests = friendRequests => ({
   type: RECEIVE_FRIEND_REQUESTS,
   friendRequests
})

export const deleteFriendRequest = friendRequest => ({
   type: DELETE_FRIEND_REQUEST,
   friendRequest
})
export const receiveFriendRequest = friendRequest => ({
   type: RECEIVE_FRIEND_REQUEST,
   friendRequest
})
export const fetchFriendRequests = () => (dispatch) => (
   APIUtil.fetchFriendRequests()
      .then( data => dispatch(receiveFriendRequests(data)))
)

export const createFriendRequest = (friendAId, friendBId) => (
   APIUtil.createFriendRequest(friendAId, friendBId)
)

export const destroyFriendRequest = (id) => (dispatch) => (
   APIUtil.deleteFriendRequest(id)
      .then( data => dispatch(deleteFriendRequest(data)))
)