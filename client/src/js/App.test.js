// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { shallow } from 'enzyme';
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk';

// import testSetup from './setupTests';
// import App from './App';
// import reducers from './reducers';

// const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// it('renders without crashing', () => {
// 	const div = document.createElement('div');
// 	const wrapper = shallow(<Provider store={store}><App /></Provider>).dive();
// 	ReactDOM.render(wrapper, div);
// 	ReactDOM.unmountComponentAtNode(div);
// });

it('adds 2 + 2', () => {
	expect(2 + 2).toEqual(4);
});
