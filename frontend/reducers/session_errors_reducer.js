import {
   RECEIVE_CURRENT_USER,
   RECEIVE_ERRORS,
   CLEAR_ERRORS
} from '../actions/session_actions';

export default (state = {}, action) => {
   Object.freeze(state);
   
   switch (action.type) {
      case RECEIVE_ERRORS:
         console.log(action.error)
         let newState = action.errors;
         return state;
      case RECEIVE_CURRENT_USER:
         return {};
      case CLEAR_ERRORS:
         return {};
      default:
         return state;
   }
}
