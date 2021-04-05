import {
   RECEIVE_INVITES, 
   RECEIVE_INVITE, 
   DELETE_INVITE
} from "../actions/invitation_actions";

export default (state = {}, action) => {
   Object.freeze(state);
   const newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_INVITES:
         return action.invites;
      case RECEIVE_INVITE:
         newState[action.invite.id] = action.invite;
         return newState;
      case DELETE_INVITE:
         delete newState[action.id];
         return newState;
      default:
         return state
   }
}