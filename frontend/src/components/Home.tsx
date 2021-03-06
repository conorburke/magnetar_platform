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
import icon from '../images/blacksmith.png';

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
  icon: {
    width: theme.spacing(13),
    height: theme.spacing(13),
    border: '1px solid black',
    padding: '1%'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    backgroundColor: 'red',
    opacity: 0.7,
    padding: '5px',
    borderRadius: '10px'
  },
  errorHide: {
    padding: '0px'
  }
}));

function mapErrors(err: string) {
  switch (err) {
    case '"wrong credentials"':
    case '"incorrect form submission"':
      err = 'Invalid Username or Password';
      break;
    case '"unable to register.  do you already have an account?"':
      err = 'Email already exists';
      break;
    default:
      return 'Log In Error';
  }
  return err;
}

const Home: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [exists, setExists] = React.useState(true);
  const [registered, setRegistered] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errors, setErrors] = React.useState('');

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleRegister = (e: any) => {
    e.preventDefault();
    setErrors('');
    if (password !== confirmPassword) {
      setErrors('Passwords do not match');
      return;
    }
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
        if (rememberMe) {
          localStorage.setItem('magnetar_token', data.token);
          localStorage.setItem('magnetar_id', data.id);
        } else {
          sessionStorage.setItem('magnetar_token', data.token);
          sessionStorage.setItem('magnetar_id', data.id);
        }
        handleSetRegisteredChange();
        dispatch(authorizeUser());
      })
      .catch(error => {
        console.log('error', error.request.response);
        setErrors(mapErrors(error.request.response));
      });
  };

  const handleSignin = (e: any) => {
    e.preventDefault();
    setErrors('');
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
        if (rememberMe) {
          localStorage.setItem('magnetar_token', data.token);
          localStorage.setItem('magnetar_id', data.id);
        } else {
          sessionStorage.setItem('magnetar_token', data.token);
          sessionStorage.setItem('magnetar_id', data.id);
        }
        handleSetSignedInChange();
        dispatch(authorizeUser());
      })
      .catch(error => {
        console.log('error', error);
        setErrors(mapErrors(error.request.response));
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
        if (res.status === 200) {
          setSignedIn(true);
        }
      })
      .catch(err => console.log(err));
  }

  if (signedIn || registered) {
    return <Redirect to="/profile" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Avatar alt="icon" src={icon} className={classes.icon} />
        {exists ? (
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
        ) : (
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        )}
        <Typography
          component="h6"
          variant="h6"
          className={errors ? classes.error : classes.errorHide}
        >
          {errors}
        </Typography>
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
