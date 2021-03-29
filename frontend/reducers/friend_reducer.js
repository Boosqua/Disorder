import {
   RECEIVE_FRIENDS,
   DELETE_FRIEND,
   RECEIVE_FRIEND
} from "../actions/friend_actions";

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FRIENDS:
      let newState = action.friends;
      return newState;
    case RECEIVE_FRIEND:
      return Object.assign({}, state, {[action.friend.id]: action.friend})
    case DELETE_FRIEND:
      return {};
    default:
      return state;
  }
};
