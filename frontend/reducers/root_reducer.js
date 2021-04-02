import { combineReducers } from 'redux';
import errorsReducer from './errors_reducer';
import sessionReducer from './session_reducer'
import entitiesReducer from './entities_reducer';

import actionCableReducer from './actioncable_reducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
  actioncable: actionCableReducer,
});

export default rootReducer;