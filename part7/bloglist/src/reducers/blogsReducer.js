import blogServices from '../services/blogs';
import {
  createNotificationObject,
  createSetNotificationAction,
  createRemoveNotificationAction
} from './notificationReducer';

export const createInitializeBlogsAction = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs.sort((blog1, blog2) => blog1.likes - blog2.likes)
    });
  };
};

export const createBlogLikedAction = (blog, blogId, userToken) => {
  return async (dispatch) => {
    const updatedBlog = await blogServices.updateABlogEntry(blog, userToken, blogId);
    dispatch({
      type: 'BLOG_LIKED',
      data: updatedBlog
    }
    );
  };
};

export const createAddNewBlogAction = (newBlog, user) => {
  const successNotification = createNotificationObject(true, 'Blog created successfully!!');
  const failedNotification = createNotificationObject(false, 'Blog creation failed!!');

  return async (dispatch) => {
    try {
      const newAddedBlog = await blogServices.createNew(newBlog, user.token);
      newAddedBlog.user = {
        id: user.id,
        name: user.name,
        username: user.username
      };
      dispatch({
        type: 'ADD_NEW_BLOG',
        data: newAddedBlog
      });
      dispatch(createSetNotificationAction(successNotification));
      setTimeout(() => {
        dispatch(createRemoveNotificationAction());
      }, 3000);
    }
    catch(err) {
      dispatch(createSetNotificationAction(failedNotification));
      setTimeout(() => {
        dispatch(createRemoveNotificationAction());
      }, 3000);
    }
  };
};

export const createRemoveBlogAction = (blogId, userToken) => {
  const successNotification = createNotificationObject(true, 'Blog deleted successfully!!');

  return async (dispatch) => {
    try {
      await blogServices.removeBlog(blogId, userToken);
      dispatch({
        type:'REMOVE_BLOG',
        data: blogId
      });
      dispatch(createSetNotificationAction(successNotification));
      setTimeout(() => {
        dispatch(createRemoveNotificationAction());
      }, 3000);
    }
    catch(err) {
      const failedNotification = createNotificationObject(false, err.response.data.error);
      dispatch(createSetNotificationAction(failedNotification));
      setTimeout(() => {
        dispatch(createRemoveNotificationAction());
      }, 3000);
    }
  };
};

const blogsReducer = (state = [], action) => {
  let newBlogs, oldBlog;

  switch(action.type){
  case 'INITIALIZE_BLOGS':
    return action.data;
  case 'ADD_NEW_BLOG':
    newBlogs = state.map(blog => { return { ...blog }});
    return newBlogs.concat(action.data);
  case 'BLOG_LIKED':
    newBlogs = state.map(blog => { return { ...blog }});
    oldBlog = newBlogs.find(blog => blog.id.localeCompare(action.data.id) === 0);
    oldBlog.likes = action.data.likes;
    return newBlogs;
  case 'REMOVE_BLOG':
    newBlogs = state.filter(blog => blog.id.localeCompare(action.data) !== 0);
    return newBlogs;
  case 'NEW_COMMENT_ADDED':
    return action.data.blogs;
  default:
    return state;
  }
};

export default blogsReducer;