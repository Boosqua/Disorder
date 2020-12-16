import {RECEIVE_SERVER_MEMBERS} from '../../actions/update_actions'

export default function serverMembersReducer(state = null, action) {
  switch (action.type) {
    case RECEIVE_SERVER_MEMBERS:
      return action.serverMembers;
    default:
      return state;
  }
}