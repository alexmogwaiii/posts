import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchUsers, setUserId } from '../../store/actions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.fetchedUsers);
  const loading = useSelector(state => state.app.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const setUser = (id) => {
    dispatch(setUserId(id));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container>
      <h1 className="title">
        Users
      </h1>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Website</TableCell>
              <TableCell align="right">Posts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
                <TableCell align="right">{user.website}</TableCell>
                <TableCell align="right">
                  <Link to="/posts">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setUser(user.id);
                      }}
                    >
                      Posts
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Users;
