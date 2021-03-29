import {
  RECEIVE_FRIEND_REQUESTS,
  DELETE_FRIEND_REQUEST,
  RECEIVE_FRIEND_REQUEST
} from "../actions/friend_actions";

export default (state = {}, action) => {
  Object.freeze(state);

   switch (action.type) {
      case RECEIVE_FRIEND_REQUESTS:
         let newState = action.friendRequests;
         return newState;
      case RECEIVE_FRIEND_REQUEST:
         return Object.assign({}, state, {[action.friendRequest.id]: action.friendRequest})
      case DELETE_FRIEND_REQUEST:
         let updatedState = Object.assign({}, state)
         delete updatedState[action.friendRequest.id];
         return updatedState;
      default:
         return state;
   }
};
