import {
   RECEIVE_FRIENDS,
   DELETE_FRIEND,
   RECEIVE_FRIEND
} from "../actions/friend_actions";

export default (state = {}, action) => {
   Object.freeze(state);
   let newState = Object.assign({}, state)
   switch (action.type) {
      case RECEIVE_FRIENDS:
         return action.friends;
      case RECEIVE_FRIEND:
         return Object.assign({}, state, {[action.friend.id]: action.friend})
      case DELETE_FRIEND:
            delete newState[action.friend.id]
            return newState
      default:
         return state;
   }
};
