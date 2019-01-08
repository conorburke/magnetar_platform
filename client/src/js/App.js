import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "./actions";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import Tools from "./components/Tools";
import magnetar from "../images/magnetar.jpg";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div id="router-container">
        <BrowserRouter>
          <div
            className="component-container"
            style={{
              backgroundColor: "#f5f5f5",
              backgroundSize: "cover"
            }}
          >
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/tools" component={Tools} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);
