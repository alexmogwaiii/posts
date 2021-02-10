import { FETCH_COMMENTS } from './types';

const initialState = {
  fetchedComments: [],
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, fetchedComments: action.payload };
    default:
      return state;
  }
};
