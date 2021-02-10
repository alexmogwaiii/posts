import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Container, Grid } from '@material-ui/core';
import { deletePost, fetchComments, editPost } from '../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '80%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    marginRight: '15px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Post = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.fetchedComments);
  const post = useSelector(state => state.posts.selectedPost);
  const [open, setOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (!comments.length) {
      dispatch(fetchComments(post.id));
    }
  }, []);

  const deletePostHandler = () => {
    dispatch(deletePost(post.id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

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

  const handleSubmit = () => {
    if (inputTitle || inputText) {
      dispatch(editPost({
        id: post.id,
        title: inputTitle,
        body: inputText,
        userId: post.userId,
      }));
    }

    handleClose();
  };

  return (
    <Grid container>
      <Container>
        <Typography variant="h4">
          {post.title}
        </Typography>
        <Typography>
          {post.body}
        </Typography>
        <div className={classes.buttons}>
          <ButtonGroup color="primary">
            <Button onClick={handleClickOpen}>
              Edit
            </Button>
            <Button onClick={deletePostHandler}>Delete</Button>
          </ButtonGroup>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="xl"
          >
            <DialogTitle id="form-dialog-title">Edit post</DialogTitle>
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
              <Button onClick={handleSubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
      <List className={classes.root}>
        {comments.map(comment => (
          <ListItem key={comment.id} alignItems="center">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" />
            </ListItemAvatar>
            <ListItemText>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {comment.name}
              </Typography>
              <Typography>
                {comment.body}
              </Typography>
              <Typography>
                {comment.email}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default Post;