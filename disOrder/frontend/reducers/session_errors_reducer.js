import {
   RECEIVE_CURRENT_USER,
   RECEIVE_ERRORS
} from '../actions/session_actions';

export default (state = {}, action) => {
   Object.freeze(state);
   let newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_ERRORS:
         newState = action.errors;
         return newState;
      case RECEIVE_CURRENT_USER:
         return {};
      default:
         return state;
   }
}
