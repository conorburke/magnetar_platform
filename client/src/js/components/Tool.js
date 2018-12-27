import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Tool extends Component {
	render() {
		return (
			<div style={{ margin: '15px', width: '340px', height: '200px' }}>
				<Card>
					<CardContent>
						<Typography color="textSecondary">Location: San Diego</Typography>
						<Typography variant="headline" component="h2">
							{this.props.tool.title}
						</Typography>
						<Typography color="textSecondary">
							{this.props.tool.category}
						</Typography>
						<Typography component="p" style={{ overflow: 'auto' }}>
							{this.props.tool.description}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">Get Details</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default Tool;
