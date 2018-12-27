import { FETCH_TOOLS, FILTER_TOOLS } from '../actions/types';

const initialState = {
	toolsList: [],
	toolsSearch: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_TOOLS:
			return { ...state, ...{ toolsList: action.payload } }; //Object.assign(initialState, {}, {toolsList: action.payload});
		case FILTER_TOOLS:
			return { ...state, ...{ toolsSearch: action.payload } };
		default:
			return state;
	}
}
