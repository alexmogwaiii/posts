import { request, BASE_URL } from './api';

export const getComments = async(postId) => {
  const comments = await request(`comments?postId=${postId}`);

  return comments;
};
