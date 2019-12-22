import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import { gql } from 'apollo-boost';

import { createProfile } from '../actions';

import url from '../utils';

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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

const profileMutation = `
  mutation UpdateUser($first_name: String, $last_name: String, $email: String, $phone_number: String) {
    updateUser(first_name: $first_name, last_name: $last_name, email: $email, phone_number: $phone_number) {
      first_name
      email
    }
  }
`;

const UpdateProfile: React.FC = () => {
  const [firstName, setFirstName] = React.useState(false);
  const [lastName, setLastName] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);

  const classes = useStyles();

  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const handleFirstNameChange = React.useCallback(e => {
    setFirstName(e.target.value);
  }, []);

  const handleLastNameChange = React.useCallback(e => {
    setLastName(e.target.value);
  }, []);

  const handlePhoneNumberChange = React.useCallback(e => {
    setPhoneNumber(e.target.value);
  }, []);

  const handleProfileUpdate = (e: any) => {
    e.preventDefault();
    axios
      .post(`${url.api}/oracle`, {
        query: profileMutation,
        variables: {
          first_name: firstName || profile.first_name,
          last_name: lastName || profile.last_name,
          email: profile.email,
          phone_number: phoneNumber || profile.phone_number
        }
      })
      .then(() => {
        dispatch(
          createProfile({
            first_name: firstName || profile.first_name,
            last_name: lastName || profile.last_name,
            email: profile.email,
            phone_number: phoneNumber || profile.phone_number
          })
        );
        setUpdated(true);
      })
      .catch((err: any) => {
        console.log('update profile error', err);
      });
  };

  if (updated) {
    return <Redirect to="/profile" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h3" variant="h3">
          Update Profile
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleProfileUpdate}
        >
          <Typography variant="h6" component="h6" gutterBottom>
            Current First Name: {profile.first_name || 'unspecified'}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstname"
            label={'First Name'}
            name="firstname"
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            value={firstName === false ? profile.first_name : firstName}
            onChange={handleFirstNameChange}
          />
          <Typography variant="h6" component="h6" gutterBottom>
            Current Last Name: {profile.last_name || 'unspecified'}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastname"
            label={'Last Name'}
            name="lastname"
            InputLabelProps={{
              shrink: true
            }}
            value={lastName === false ? profile.last_name : lastName}
            onChange={handleLastNameChange}
          />
          <Typography variant="h6" component="h6" gutterBottom>
            Current Phone Number: {profile.phone_number || 'unspecified'}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phonenumber"
            label={'Phone Number'}
            name="phoneNumber"
            InputLabelProps={{
              shrink: true
            }}
            value={phoneNumber === false ? profile.phone_number : phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default UpdateProfile;
