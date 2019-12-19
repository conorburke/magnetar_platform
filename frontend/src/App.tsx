import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import { useDispatch, useSelector } from 'react-redux';
import { authorizeUser } from './actions';

import About from './components/About';
import Header from './components/Header';
import Home from './components/Home';
import Users from './components/Users';
import Profile from './components/Profile';
import SideDrawer from './components/Drawer';
import Messages from './components/Messages';
import ProtectedRoute from './components/ProtectedRoute';
import AuthError from './components/AuthError';
import ToolsScreen from './components/ToolsScreen';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: grey
  }
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(authorizeUser());

  const signedIn = useSelector((state: any) => {
    // console.log('lajflasjf', state)
    // console.log(sessionStorage.getItem('magnetar_token'))
    return state.authorized;
  });

  console.log('app signedIn', signedIn);

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Header />
          <SideDrawer signedIn={signedIn} />
          <div className="routes-container">
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/profile" component={Profile} /> */}
            {/* <Route exact path="/users" component={Users} /> */}
            {/* <Route exact path="/tools" component={Tools} />
            <Route exact path="/messages" component={Messages} /> */}
            <ProtectedRoute
              exact={true}
              isAuthenticated={signedIn}
              component={Profile}
              restrictedPath="/profile"
              authenticationPath="/unauthorized"
            />
            <ProtectedRoute
              exact={true}
              isAuthenticated={signedIn}
              component={Users}
              restrictedPath="/users"
              authenticationPath="/unauthorized"
            />
            <ProtectedRoute
              exact={true}
              isAuthenticated={signedIn}
              component={ToolsScreen}
              restrictedPath="/tools"
              authenticationPath="/unauthorized"
            />
            <ProtectedRoute
              exact={true}
              isAuthenticated={signedIn}
              component={Messages}
              restrictedPath="/messages"
              authenticationPath="/unauthorized"
            />

            <Route exact path="/about" component={About} />
            <Route exact path="/unauthorized" component={AuthError} />
          </div>
        </Router>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
