import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';

import { fetchPosts, setPost } from '../../store/actions';
import { pushPost } from '../../api/posts';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Posts = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.users.selectedUserId);
  const posts = useSelector(state => state.posts.fetchedPosts);
  const [inputTitle, setInputTitle] = useState('');
  const [inputText, setInputText] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;

    switch (id) {
      case 'title':
        setInputTitle(value);
        break;
      case 'text':
        setInputText(value);
        break;
      default:
        break;
    }
  };

  const addPost = async() => {
    try {
      const post = await pushPost({
        title: inputTitle,
        body: inputText,
        userId,
      });

      console.log(post);
    } catch (error) {
      throw new Error(error);
    }
  };

  const selectPost = (post) => {
    dispatch(setPost(post));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    addPost();
    handleClose();
  };

  useEffect(() => {
    dispatch(fetchPosts(userId));
  }, []);

  return (
    <Grid container>

      <h1 className="title">
        Posts
      </h1>
      <Container maxWidth="lg">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add new
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="xl"
        >
          <DialogTitle id="form-dialog-title">Add new post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write here the title of your post
            </DialogContentText>
            <TextField
              margin="dense"
              id="title"
              label="Title"
              type="text"
              onChange={handleChange}
            />
            <DialogContentText>
              Write here the text of your post
            </DialogContentText>
            <TextField
              margin="dense"
              id="text"
              label="Text"
              type="text"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Titile</TableCell>
              <TableCell align="right">Body</TableCell>
              <TableCell align="right">Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map(post => (
              <TableRow key={post.id}>
                <TableCell component="th" scope="row">
                  {post.title}
                </TableCell>
                <TableCell align="right">{post.body}</TableCell>
                <TableCell align="right">
                  <Link to={`/post/${post.id}`}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        selectPost(post);
                      }}
                    >
                      Detail
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

export default Posts;
