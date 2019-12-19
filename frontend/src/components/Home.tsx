import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import querystring from 'querystring';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authorizeUser } from '../actions';
import url from '../utils';
import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Home: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [exists, setExists] = React.useState(true);
  const [registered, setRegistered] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleRegister = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `${url.api}/register`,
        querystring.stringify({
          email: email,
          password: password
        }),
        {
          headers: {
            Accept: 'application/x-www-form-urlencoded; application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(({ data }) => {
        console.log(data);
        if (rememberMe) {
          localStorage.setItem('magnetar_token', data.token);
        } else {
          sessionStorage.setItem('magnetar_token', data.token);
        }
        handleSetRegisteredChange();
        dispatch(authorizeUser());
      })
      .catch(error => {
        console.log('error', error.request._response);
        alert(`error: ${error}`);
      });
  };

  const handleSignin = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `${url.api}/signin`,
        querystring.stringify({
          email: email,
          password: password
        }),
        {
          headers: {
            Accept: 'application/x-www-form-urlencoded; application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(({ data }) => {
        console.log(data);
        if (rememberMe) {
          localStorage.setItem('magnetar_token', data.token);
        } else {
          sessionStorage.setItem('magnetar_token', data.token);
        }
        handleSetSignedInChange();
        dispatch(authorizeUser());
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const handleEmailChange = React.useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = React.useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const handleConfirmPasswordChange = React.useCallback(e => {
    setConfirmPassword(e.target.value);
  }, []);

  const handleExistChange = React.useCallback(
    e => {
      e.preventDefault();
      setExists(!exists);
    },
    [exists]
  );

  const handleSetRegisteredChange = React.useCallback(
    () => {
      setRegistered(!registered);
    },
    [registered]
  );

  const handleSetSignedInChange = React.useCallback(
    () => {
      setSignedIn(!signedIn);
    },
    [signedIn]
  );

  const handleSetRememberMeChange = React.useCallback(
    () => {
      setRememberMe(!rememberMe);
    },
    [rememberMe]
  );

  let token = localStorage.getItem('magnetar_token');
  if (!token) {
    token = sessionStorage.getItem('magnetar_token');
  }

  if (token) {
    axios
      .post(`${url.api}/verify`, token, { headers: { Authorization: token } })
      .then(res => {
        console.log(res);
        console.log(res.status);
        if (res.status === 200) {
          setSignedIn(true);
        }
      })
      .catch(err => console.log(err));
  }

  if (signedIn) {
    return <Redirect to="/profile" />;
  }

  if (registered) {
    return <Redirect to="/profile" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {exists ? (
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
        ) : (
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        )}
        <form
          className={classes.form}
          noValidate
          onSubmit={exists ? handleSignin : handleRegister}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          {!exists ? (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password-confirm"
              label="Confirm Password"
              type="password"
              id="password-confirm"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          ) : null}
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                checked={rememberMe}
                color="primary"
                onClick={handleSetRememberMeChange}
              />
            }
            label="Remember Me"
          />
          {exists ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          )}
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              {exists ? (
                <Link href="#" variant="body2" onClick={handleExistChange}>
                  {"Don't have an account? Register"}
                </Link>
              ) : (
                <Link href="#" variant="body2" onClick={handleExistChange}>
                  {'Already have an account? Sign In'}
                </Link>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;
