import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import serverErrorsReducer from './servers/server_errors_reducer';
import channelsErrorsReducer from './channels/channel_errors_reducer'

const errorsReducer = combineReducers({
   session: sessionErrorsReducer,
   user: channelsErrorsReducer
});

export default errorsReducer; 