import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';

import About from './components/About';
import Header from './components/Header';
import Home from './components/Home';
import Users from './components/Users';
import Tools from './components/Tools';
import Profile from './components/Profile';
import Drawer from './components/Drawer';
import Messages from './components/Messages';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: grey
  }
});

const App: React.FC = () => {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Header />
          <Drawer />
          <div className="routes-container">
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/tools" component={Tools} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/about" component={About} />
            <Route exact path="/messages" component={Messages} />
          </div>
        </Router>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
