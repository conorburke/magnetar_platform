import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const AuthError: React.FC = () => {
  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        AuthError. You must be logged in to view this page.
      </div>
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
