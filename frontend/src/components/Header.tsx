import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

const Header: React.FC = () => {
  const [loggedOut, setLoggedOut] = React.useState(false);

  const classes = useStyles();

  function handleLogout() {
    sessionStorage.removeItem('magnetar_token');
    localStorage.removeItem('magnetar_token');
    setLoggedOut(true);
  }

  if (loggedOut) {
    return <Redirect to="/tools" />;
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: 'transparent', color: 'transparent' }}
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            color="inherit"
            // component={props => <Link to={"/"} {...props} />}
          >
            Home
          </Button>
          <Button
            color="inherit"
            // component={props => <Link to={"/users"} {...props} />}
          >
            Users
          </Button>
          <Button
            color="inherit"
            // component={props => <Link to={"/tools"} {...props} />}
          >
            Tools
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
