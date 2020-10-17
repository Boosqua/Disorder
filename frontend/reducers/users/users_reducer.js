import { RECEIVE_USERS, RECEIVE_USER } from '../../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';

export default (state = {}, action) => {
   Object.freeze(state)
   let newState = Object.assign( {}, state);

   switch (action.type){
      case RECEIVE_USERS:
         return action.users;
      case RECEIVE_USER:
      case RECEIVE_CURRENT_USER:
         return Object.assign(newState, 
            { [action.currentUser.id]: action.currentUser })
      default:
         return state
   }
}