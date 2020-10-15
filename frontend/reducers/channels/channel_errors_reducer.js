import {
   RECEIVE_CHANNEL,
   RECEIVE_CHANNELS,
   REMOVE_CHANNEL,
   RECEIVE_ERRORS,
   CLEAR_ERRORS
} from '../../actions/channel_actions'

export default (state={}, action) => {
   Object.freeze(state);

   switch (action.type) {
      case RECEIVE_ERRORS:
         return action.errors;
      case CLEAR_ERRORS:
      case RECEIVE_CHANNEL:
      case RECEIVE_CHANNELS:
      case REMOVE_CHANNEL:
         return {};
      default:
         return state;
   }
}