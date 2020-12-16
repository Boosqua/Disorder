import { combineReducers } from "redux";
import modal from "./modal_reducer";
import update from './update_reducer'
import serverMembers from './server_members'
const uiReducer = combineReducers({
  modal,
  update,
  serverMembers
});

export default uiReducer