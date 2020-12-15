import {
   RECEIVE_CURRENT_USER,
   LOGOUT_CURRENT_USER
} from '../actions/session_actions';
import { RECEIVE_CURRENT_SERVER, RECEIVE_SERVER } from '../actions/server_actions';

const _nullSession = {
   currentUserId: null,
   currentServerId: 1
};

const sessionReducer = ( state = _nullSession, action ) => {
   Object.freeze(state);
   let newState = ({}, state)
   switch (action.type) {
      case RECEIVE_CURRENT_USER:
         return Object.assign({}, newState, {currentUserId: action.currentUser.id});
      case RECEIVE_SERVER:
      case RECEIVE_CURRENT_SERVER:
         return Object.assign({}, newState, {currentServerId: action.server.id});
      case LOGOUT_CURRENT_USER:
         return _nullSession;
      default:
         return state;
   }
};

export default sessionReducer;