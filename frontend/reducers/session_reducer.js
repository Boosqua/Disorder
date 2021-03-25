import {
   RECEIVE_CURRENT_USER,
   LOGOUT_CURRENT_USER
} from '../actions/session_actions';
import { RECEIVE_CURRENT_CHANNEL, RECEIVE_SERVER } from '../actions/server_actions';

const _nullSession = {
   currentUser: null,
   channelId: null
};

const sessionReducer = ( state = _nullSession, action ) => {
   Object.freeze(state);
   let newState = ({}, state)
   switch (action.type) {
      case RECEIVE_CURRENT_USER:
         return Object.assign({}, newState, {currentUser: action.currentUser});
      case RECEIVE_SERVER:
      case RECEIVE_CURRENT_CHANNEL:
         return Object.assign({}, newState, {channelId: action.id});
      case LOGOUT_CURRENT_USER:
         return _nullSession;
      default:
         return state;
   }
};

export default sessionReducer;