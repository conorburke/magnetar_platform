import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Tool from './Tool';

class Tools extends Component {
	componentDidMount() {
		console.log('tools component mounted');
		this.props.fetchTools();
	}

	renderTools = () => {
		console.log('rendering tools');
		return this.props.tools.data.tools.map(tool => {
			return <Tool key={tool.id} tool={tool} />;
			// return <li key={tool.id}>{tool.category}</li>;
		});
	};

	render() {
		console.log('tools', this.props.tools);

		// const toolsList = this.props.tools.data.tools.map((t) => {
		// 	return (<li key={t.id}>{t.title}</li>)
		// });
		return (
			<div
				className="main-content"
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<div>
					<h1>Tools</h1>
				</div>
				{/* <div className='loader'></div> */}
				{this.props.tools.data ? (
					<ul
						style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
					>
						{this.renderTools()}
					</ul>
				) : (
					<div className="loader" />
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		toolFilter: state.tools.toolsSearch,
		tools: state.tools.toolsList
	};
}

export default connect(
	mapStateToProps,
	actions
)(Tools);
