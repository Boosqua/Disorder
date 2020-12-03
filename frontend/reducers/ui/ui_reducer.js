import { combineReducers } from "redux";
import modal from "./modal_reducer";
import update from './update_reducer'

const uiReducer = combineReducers({
  modal,
  update
});

export default uiReducer