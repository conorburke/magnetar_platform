import { combineReducers } from 'redux';

import authReducer from './authReducer';
import authorizedReducer from './authorizeReducer';
import profileReducer from './profileReducer';
import rentReducer from './rentReducer';
import toolReducer from './toolReducer';
import toolsReducer from './toolsReducer';
import userToolsReducer from './userToolsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  authorized: authorizedReducer,
  profile: profileReducer,
  tool: toolReducer,
  tools: toolsReducer,
  userTools: userToolsReducer,
  users: usersReducer,
  rentDates: rentReducer
});
