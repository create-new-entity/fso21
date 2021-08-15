import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Blog from './Blog';

describe('Blog component tests', () => {
  test('Renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
    const blog = {
      user: 'dummy111',
      likes: 5,
      author: 'dumba',
      title: 'damba dumba',
      url: 'dambadumba.com',
    };

    const likeButtonHandler = jest.fn();
    const removeButtonHandler = jest.fn();

    const component = render(
      <Blog
        blog={blog}
        likeButtonHandler={likeButtonHandler}
        removeButtonHandler={removeButtonHandler}
      />
    );

    const titleElement = component.container.querySelector('.title');
    const authorElement = component.container.querySelector('.author');
    const urlElement = component.container.querySelector('.url');
    const likesElement = component.container.querySelector('.likes');

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();
    expect(titleElement).toBeVisible();
    expect(authorElement).toBeVisible();
    expect(urlElement).not.toBeInTheDocument();
    expect(likesElement).not.toBeInTheDocument();
  });
});
