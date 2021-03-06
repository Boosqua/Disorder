import {
   RECEIVE_CURRENT_USER,
   LOGOUT_CURRENT_USER,
   RECEIVE_FRIEND_IDS
} from '../actions/session_actions';
import { RECEIVE_CURRENT_CHANNEL } from '../actions/server_actions';

const _nullSession = {
   currentUser: null,
   channelId: null,
   friendIds: null
};

const sessionReducer = ( state = _nullSession, action ) => {
   Object.freeze(state);
   let newState = ({}, state)
   switch (action.type) {
      case RECEIVE_CURRENT_USER:
         return Object.assign({}, newState, { currentUser: action.currentUser });
      case RECEIVE_CURRENT_CHANNEL:
         return { currentUser: state.currentUser, channelId: action.id }
      case RECEIVE_FRIEND_IDS:
         return Object.assign({}, newState, { friendIds: action.friendIds });
      case LOGOUT_CURRENT_USER:
         return _nullSession;
      default:
         return state;
   }
};

export default sessionReducer;