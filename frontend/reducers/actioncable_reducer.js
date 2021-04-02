import {
   RECEIVE_ALL_SUBSCRIPTIONS
} from "../actions/actioncable_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_SUBSCRIPTIONS:
      return action.subscriptions;
    default:
      return state;
  }
};
