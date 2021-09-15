import blogServices from '../services/blogs';
import _ from 'lodash';

export const createAddACommentAction = (blogs, blog, comment, token) => {
  return async (dispatch) => {
    const addedCommentObj = await blogServices.addAComment(blog.id, comment, token);
    const newBlogs = _.cloneDeep(blogs);
    const newBlog = newBlogs.find(blog => blog.id === addedCommentObj.blog);
    newBlog.comments.push({
      comment: addedCommentObj.comment,
      id: addedCommentObj.id
    });
    dispatch({
      type: 'NEW_COMMENT_ADDED',
      data: {
        blogs: newBlogs.sort((blog1, blog2) => blog1.likes - blog2.likes),
        blog: newBlog
      }
    });
  };
};

export const createCommentInputChangedAction = (newInput) => {
  return async (dispatch) => {
    dispatch({
      type: 'COMMENT_INPUT_CHANGED',
      data: newInput
    });
  };
};

const commentInputReducer = (state = '', action) => {
  switch(action.type) {
  case 'NEW_COMMENT_ADDED':
    return '';
  case 'COMMENT_INPUT_CHANGED':
    return action.data;
  default:
    return state;
  }
}

export default commentInputReducer;