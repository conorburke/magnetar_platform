import React, { Component } from "react";

// import Button from '@material-ui/core/Button';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
// import TextField from '@material-ui/core/TextField';

import circularSaw from "../../images/circular-saw.jpg";
import jigsaw from "../../images/jigsaw.jpg";
import woodworking from "../../images/woodworking.jpg";
import account from "../../images/account2.png";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", phoneNumber: "", tabValue: 0 };
  }

  handleChange = input => event => {
    console.log(this.state.firstName);
    this.setState({ [input]: event.target.value });
  };

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  buttonValues = ["Sign Up", "Log In"];

  render() {
    return (
      <div className="main-content">
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Magnetar</h1>
        </div> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              flex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h3>Rent Tools</h3>
          </div>
          <div
            className="landing-app-header"
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h3>Get App on iPhone and Android</h3>
          </div>
        </div>
        <div className="landing-pictures" style={{ display: "flex" }}>
          <div
            style={{
              flex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <p>
              Magnetar lets you rent and loan tools so you can finish the
              projects you need to.
            </p>
            <img
              src={circularSaw}
              alt="Celtic God of Smiths"
              style={{
                margin: "50px",
                border: "5px solid black",
                maxWidth: "60%",
                maxHeight: "400px"
              }}
            />
          </div>
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src={account}
              alt="Celtic God of Smiths"
              style={{
                margin: "50px",
                border: "5px solid black",
                borderRadius: "20px",
                maxWidth: "60%",
                maxHeight: "400px"
              }}
            />
          </div>
          {/* <div style={{ flex: 2 }}>
						<Tabs
							value={this.state.tabValue}
							indicatorColor="primary"
							textColor="primary"
							fullWidth
							onChange={this.handleTabChange}
							style={{
								display: 'flex',
								flexGrow: '1',
								justifyContent: 'space-evenly'
							}}
						>
							<Tab label="Sign Up" />
							<Tab label="Log In" />
						</Tabs>
						<form noValidate autoComplete="off">
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<div
									style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
								>
									{this.state.tabValue === 0 ? (
										<TextField
											required
											id="first-name"
											label="First Name"
											className="form-field"
											value={this.state.firstName}
											onChange={this.handleChange('firstName')}
											margin="normal"
										/>
									) : null}
									{this.state.tabValue === 0 ? (
										<TextField
											required
											id="last-name"
											label="Last Name"
											className="form-field"
											value={this.state.lastName}
											onChange={this.handleChange('lastName')}
											margin="normal"
										/>
									) : null}
								</div>
								<div
									style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
								>
									<TextField
										required
										id="phone-number"
										label="Phone Number"
										className="form-field"
										value={this.state.phoneNumber}
										onChange={this.handleChange('phoneNumber')}
										margin="normal"
									/>
									{this.state.tabValue === 1 ? (
										<TextField
											id="password-input"
											label="Password"
											type="password"
											autoComplete="current-password"
											margin="normal"
										/>
									) : null}
									<Button
										variant="outlined"
										color="primary"
										style={{
											width: '170px',
											maxHeight: '48px',
											marginTop: '16px'
										}}
									>
										{this.buttonValues[this.state.tabValue]}
									</Button>
								</div>
							</div>
						</form>
					</div> */}
        </div>
      </div>
    );
  }
}

export default Landing;
