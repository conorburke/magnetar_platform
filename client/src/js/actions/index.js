import axios from 'axios';

import { FETCH_TOOLS, FETCH_USER, FILTER_TOOLS } from './types';
import { toolsQuery } from './queries';

export const fetchTools = () => {
	return function(dispatch) {
		axios
			.post('/oracle', { query: toolsQuery })
			.then(res => dispatch({ type: FETCH_TOOLS, payload: res.data }));
	};
};

export const fetchUser = () => {
	return function(dispatch) {
		axios
			.get('/api/current_user')
			.then(res => dispatch({ type: FETCH_USER, payload: res.data }));
	};
};

export const filterTools = text => {
	return { type: FILTER_TOOLS, payload: text };
};
