import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Tool from './Tool';

const tool = { title: '', category: '', description: '' };

it('renders without crashing', () => {
	const div = document.createElement('div');
	const wrapper = shallow(<Tool tool={tool} />);
	ReactDOM.render(wrapper, div);
	ReactDOM.unmountComponentAtNode(div);
});
