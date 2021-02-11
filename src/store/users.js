import { FETCH_USERS, SET_USER_ID } from './types';

const initialState = {
  fetchedUsers: [],
  selectedUserId: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, fetchedUsers: action.payload };
    case SET_USER_ID:
      return { ...state, selectedUserId: action.payload };
    default:
      return state;
  }
};
