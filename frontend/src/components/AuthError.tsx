import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const AuthError: React.FC = () => {
  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        Authentication Error
      </Typography>
      <Typography component="p" style={{ margin: '5px' }}>
        You must be logged in to view this page.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
      >
        Log In
      </Button>
    </div>
  );
};

export default AuthError;
