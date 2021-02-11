import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './appReducer';
import { usersReducer } from './users';
import { postsReducer } from './posts';
import { commentsReducer } from './comments';

export const rootReducer = combineReducers({
  users: usersReducer,
  app: appReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk,
  ),
));
/* eslint-enable */

export default store;
