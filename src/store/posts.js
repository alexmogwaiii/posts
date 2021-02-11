import { FETCH_POSTS, SET_POST, DELETE_POST, EDIT_POST } from './types';

const initialState = {
  fetchedPosts: [],
  selectedPost: {},
  deletedPost: null,
  editedPost: null,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, fetchedPosts: action.payload };
    case SET_POST:
      return { ...state, selectedPost: action.payload };
    case DELETE_POST:
      return { ...state, deletedPost: action.payload };
    case EDIT_POST:
      return { ...state, editedPost: action.payload };
    default:
      return state;
  }
};
