import {
   RECEIVE_ERRORS,
   RECEIVE_SERVERS,
   CLEAR_ERRORS,
   RECEIVE_SERVER,
   receiveServers
} from '../../actions/server_actions'

export default (state={}, action) => {
   Object.freeze(state);
   let newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_ERRORS:
         return action.errors
      case RECEIVE_SERVER:
      case RECEIVE_SERVERS:
      case CLEAR_ERRORS:
         return {};
      default:
         return state;
   }
}