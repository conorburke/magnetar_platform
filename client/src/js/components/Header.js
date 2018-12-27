import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import theme from '../theme';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navigatorMenu: null,
			profileMenu: null
		};
	}

	renderHeader() {
		const profileOpen = Boolean(this.state.profileMenu);
		console.log('header auth', this.props.auth);
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<div>
						<IconButton
							aria-owns={profileOpen ? 'profile-appbar' : null}
							aria-haspopup="true"
							onClick={this.handleProfileMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="profile-appbar"
							anchorEl={this.state.profileMenu}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={profileOpen}
							onClose={this.handleProfileClose}
						>
							<MenuItem>
								<Link to="/profile" style={{ textDecoration: 'none' }}>
									Profile
								</Link>
							</MenuItem>
							<MenuItem onClick={this.handleProfileClose}>
								<a href="/auth/google">Log In with Google</a>
							</MenuItem>
							<MenuItem onClick={this.handleProfileClose}>Close</MenuItem>
						</Menu>
					</div>
				);
			default:
				return (
					<div>
						<IconButton
							aria-owns={profileOpen ? 'profile-appbar' : null}
							aria-haspopup="true"
							onClick={this.handleProfileMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="profile-appbar"
							anchorEl={this.state.profileMenu}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={profileOpen}
							onClose={this.handleProfileClose}
						>
							<MenuItem>
								<Link to="/profile" style={{ textDecoration: 'none' }}>
									Profile
								</Link>
							</MenuItem>
							<MenuItem>
								<a href="/api/logout">Log Out</a>
							</MenuItem>
							<MenuItem onClick={this.handleProfileClose}>Close</MenuItem>
						</Menu>
					</div>
				);
		}
	}

	handleNavigotorMenu = event => {
		this.setState({ navigatorMenu: event.currentTarget });
	};

	handleNavigotorClose = () => {
		this.setState({ navigatorMenu: null });
	};

	handleProfileMenu = event => {
		this.setState({ profileMenu: event.currentTarget });
	};

	handleProfileClose = () => {
		this.setState({ profileMenu: null });
	};

	render() {
		const navigatorOpen = Boolean(this.state.navigatorMenu);
		return (
			<AppBar
				position="fixed"
				style={{ backgroundColor: theme.palette.mobile.primary }}
			>
				<Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<IconButton
							aria-owns={navigatorOpen ? 'navigator-appbar' : null}
							aria-haspopup="true"
							onClick={this.handleNavigotorMenu}
							color="inherit"
							style={{ display: 'inline-block' }}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="navigator-appbar"
							anchorEl={this.state.navigatorMenu}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={navigatorOpen}
							onClose={this.handleNavigatorClose}
						>
							<MenuItem onClick={this.handleNavigotorClose}>
								<Link to="/" style={{ textDecoration: 'none' }}>
									Home
								</Link>
							</MenuItem>
							<MenuItem onClick={this.handleNavigotorClose}>
								<Link to="/tools" style={{ textDecoration: 'none' }}>
									Tools
								</Link>
							</MenuItem>
							<MenuItem onClick={this.handleNavigotorClose}>Close</MenuItem>
						</Menu>
						<MenuItem>
							<Typography
								variant="title"
								color="inherit"
								style={{ display: 'flex', alignItems: 'center' }}
							>
								<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
									Magnetar
								</Link>
							</Typography>
						</MenuItem>
					</div>
					{this.renderHeader()}
				</Toolbar>
			</AppBar>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
