import { FETCH_USERS, SHOW_LOADER, HIDE_LOADER,
  FETCH_POSTS, SET_USER_ID, SET_POST, FETCH_COMMENTS,
  DELETE_POST,
  EDIT_POST } from './types';

import { getUsers } from '../api/users';
import { getPosts, deletePost as deletePostFromServer,
  editPost as editPostInServer } from '../api/posts';
import { getComments } from '../api/comments';

export function fetchUsers() {
  return async(dispatch) => {
    dispatch(showLoader());
    const usersFromServer = await getUsers();

    dispatch({ type: FETCH_USERS, payload: usersFromServer });
    dispatch(hideLoader());
  };
}

export function setUserId(id) {
  return {
    type: SET_USER_ID,
    payload: id,
  };
}

export function fetchPosts(userId) {
  return async(dispatch) => {
    const postsFromServer = await getPosts(userId);

    dispatch({ type: FETCH_POSTS, payload: postsFromServer });
  };
}

export function setPost(post) {
  return {
    type: SET_POST,
    payload: post,
  };
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}

export function fetchComments(postId) {
  return async(dispatch) => {
    const usersFromServer = await getComments(postId);

    dispatch({ type: FETCH_COMMENTS, payload: usersFromServer });
  };
}

export function deletePost(postId) {
  return async(dispatch) => {
    const deletedPost = await deletePostFromServer(postId);

    dispatch({ type: DELETE_POST, payload: deletePost });
  };
}

export function editPost(data) {
  return async(dispatch) => {
    const editedPost = await editPostInServer(data);

    dispatch({ type: EDIT_POST, payload: editedPost });

    console.log(editedPost);
  };
}
