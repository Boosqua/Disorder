import { RECEIVE_UPDATE, REMOVE_UPDATE } from '../../actions/update_actions';
import { OPEN_MODAL, CLOSE_MODAL } from "../../actions/modal_actions";

export default function updateReducer (state = null, action) {
  switch (action.type) {
     case RECEIVE_UPDATE:
        return action.update;
      case REMOVE_UPDATE:
      case CLOSE_MODAL:
         return null;
      default:
         return state;
  }
}