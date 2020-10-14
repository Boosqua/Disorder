import { combineReducers } from 'redux';
import usersReducer from './user_reducer';
import serversReducer from './servers/servers_reducer';

const entitiesReducer = combineReducers({
   users: usersReducer,
   servers: serversReducer
});

export default entitiesReducer;