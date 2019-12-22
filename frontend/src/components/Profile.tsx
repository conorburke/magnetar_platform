import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import nels from '../images/nels.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    }
  })
);

const Profile: React.FC = () => {
  const classes = useStyles();

  const profile = useSelector((state: any) => state.profile);
  console.log('profile', profile);
  return (
    <div>
      {profile ? (
        <div className={classes.root}>
          <Typography variant="h3" component="h3" gutterBottom>
            Profile
          </Typography>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Avatar alt="nels" src={nels} className={classes.large} />
          </div>
          <Typography variant="h6" component="h6" gutterBottom>
            First Name: {profile.first_name || 'unspecified'}
          </Typography>
          <Typography variant="h6" component="h6" gutterBottom>
            Last Name: {profile.last_name || 'unspecified'}
          </Typography>
          <Typography variant="h6" component="h6" gutterBottom>
            Email: {profile.email || 'unspecified'}
          </Typography>
          <Typography variant="h6" component="h6" gutterBottom>
            Phone Number: {profile.phone_number || 'unspecified'}
          </Typography>
          <Button
            component={Link}
            to="/updateprofile"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Update Profile
          </Button>
        </div>
      ) : (
        <div>Profile</div>
      )}
    </div>
  );
};

export default Profile;
