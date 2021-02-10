import React from 'react';
import { Route, Redirect, HashRouter } from 'react-router-dom';
import Users from './components/Users/Users';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';

import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Route path="/users" component={Users} />
        <Route path="/posts/" component={Posts} />
        <Route path="/post/:postId" component={Post} />
        <Redirect from="/" to="/users" />
      </HashRouter>
    </div>
  );
}

export default App;
