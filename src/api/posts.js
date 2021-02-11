import { request, BASE_URL } from './api';

export const getPosts = async(userId) => {
  const posts = await request(`posts?userId=${userId}`);

  return posts;
};

export const pushPost = async(data) => {
  const resp = await fetch(`${BASE_URL}posts`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return resp.json();
};

export const deletePost = async(postId) => {
  const resp = await fetch(`${BASE_URL}posts/${postId}`, {
    method: 'DELETE',
  });

  return resp.json();
};

export const editPost = async(data) => {
  const resp = await fetch(`${BASE_URL}posts/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return resp.json();
};