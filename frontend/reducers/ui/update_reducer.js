import { RECEIVE_UPDATE, REMOVE_UPDATE } from '../../actions/update_actions';

export default function updateReducer (state = null, action) {
  switch (action.type) {
    case RECEIVE_UPDATE:
      return action.update;
    case REMOVE_UPDATE:
      return null;
    default:
      return state;
  }
}