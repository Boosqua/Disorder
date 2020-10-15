import { combineReducers } from 'redux';
import usersReducer from './user_reducer';
import serversReducer from './servers/servers_reducer';
import channelsReducer from './channels/channels_reducer';

const entitiesReducer = combineReducers({
   users: usersReducer,
   servers: serversReducer,
   channels: channelsReducer
});

export default entitiesReducer;