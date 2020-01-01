import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';

import url from '../utils';
import { fetchProfile } from '../actions';

const deleteDepot = `
  mutation DeleteDepot($id: ID) {
    deleteDepot(id: $id) {
      id
    }
  }
`;

const useStyles = makeStyles({
  delete: {
    color: 'red'
  },
  root: {
    width: '100%',
    overflowX: 'auto'
  }
});

const MyDepots: React.FC = () => {
  const profile = useSelector((state: any) => state.profile);

  const classes = useStyles();

  const dispatch = useDispatch();

  function handleDelete(id: string | number) {
    axios
      .post(`${url.api}/oracle`, {
        query: deleteDepot,
        variables: {
          id
        }
      })
      .then((res: any) => {
        alert(`Deleted Depot with id ${id}`);
        dispatch(fetchProfile(profile.id));
      });
  }

  return (
    <div>
      <Typography variant="h3" component="h3" gutterBottom>
        My Depots
      </Typography>
      <Paper>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Address 1</TableCell>
              <TableCell>Address 2</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State or Region</TableCell>
              <TableCell>Zipcode</TableCell>
              <TableCell>Delete?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profile.depots
              ? profile.depots.map((depot: any) => (
                  <TableRow key={depot.id}>
                    <TableCell>{depot.address_1}</TableCell>
                    <TableCell>{depot.address_2}</TableCell>
                    <TableCell>{depot.city}</TableCell>
                    <TableCell>{depot.region}</TableCell>
                    <TableCell>{depot.zipcode}</TableCell>
                    <TableCell>
                      <Button onClick={handleDelete.bind(depot, depot.id)}>
                        <DeleteForeverIcon className={classes.delete} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default MyDepots;
