import blogServices from '../services/blogs';

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
  return async (dispatch) => {
    const newAddedBlog = await blogServices.createNew(newBlog, user.token);
    newAddedBlog.user = {
      id: user.id,
      name: user.name,
      username: user.username
    };
    dispatch({
      type: 'ADD_NEW_BLOG',
      data: newBlog
    });
  };
};

export const createRemoveBlogAction = (blogId, userToken) => {
  return async (dispatch) => {
    await blogServices.removeBlog(blogId, userToken);
    dispatch({
      type:'REMOVE_BLOG',
      data: blogId
    });
  };
};

const blogsReducer = (state = [], action) => {
  let newState, newBlogs, oldBlog;

  switch(action.type){
  case 'INITIALIZE_BLOGS':
    return action.data;
  case 'ADD_NEW_BLOG':
    newState = [...state, action.data];
    return newState;
  case 'BLOG_LIKED':
    newBlogs = state.map(blog => { return { ...blog }});
    oldBlog = newBlogs.find(blog => blog.id.localeCompare(action.data.id) === 0);
    oldBlog.likes = action.data.likes;
    return newBlogs;
  case 'REMOVE_BLOG':
    newBlogs = state.filter(blog => blog.id.localeCompare(action.data) !== 0);
    return newBlogs;
  default:
    return state;
  }
};

export default blogsReducer;