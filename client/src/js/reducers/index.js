import { combineReducers } from 'redux';

import authReducer from './authReducer';
import toolsReducer from './toolsReducer';

export default combineReducers({
	auth: authReducer,
	tools: toolsReducer
});
