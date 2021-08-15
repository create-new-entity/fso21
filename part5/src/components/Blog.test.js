import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Blog from './Blog';

describe('Blog component tests', () => {
  let component;
  const blog = {
    user: 'dummy111',
    likes: 5,
    author: 'dumba',
    title: 'damba dumba',
    url: 'dambadumba.com',
  };

  const mockLikeButtonHandler = jest.fn();
  const mockRemoveButtonHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        likeButtonHandler={mockLikeButtonHandler}
        removeButtonHandler={mockRemoveButtonHandler}
      />
    );
  });

  test('Renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
    let titleElement = component.container.querySelector('.title');
    let authorElement = component.container.querySelector('.author');
    let urlElement = component.container.querySelector('.url');
    let likesElement = component.container.querySelector('.likes');

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();
    expect(titleElement).toBeVisible();
    expect(authorElement).toBeVisible();
    expect(urlElement).not.toBeInTheDocument();
    expect(likesElement).not.toBeInTheDocument();
  });

  test('When view button is pressed, likes and url are also displayed', () => {
    let titleElement = component.container.querySelector('.title');
    let authorElement = component.container.querySelector('.author');
    let urlElement = component.container.querySelector('.url');
    let likesElement = component.container.querySelector('.likes');
    let viewButton = component.container.querySelector('.viewButton');

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();
    expect(titleElement).toBeVisible();
    expect(authorElement).toBeVisible();
    expect(urlElement).not.toBeInTheDocument();
    expect(likesElement).not.toBeInTheDocument();
    expect(viewButton).toBeDefined();
    expect(viewButton).toBeVisible();

    fireEvent.click(viewButton);

    urlElement = component.container.querySelector('.url');
    likesElement = component.container.querySelector('.likes');

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();
    expect(titleElement).toBeVisible();
    expect(authorElement).toBeVisible();
    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
    expect(urlElement).toBeVisible();
    expect(likesElement).toBeVisible();
  });

  test('If the like button is pressed twice, the respective event handler is called twice.', () => {
    let viewButton = component.container.querySelector('.viewButton');
    fireEvent.click(viewButton);
    let likeButton = component.container.querySelector('.likeButton');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockLikeButtonHandler.mock.calls).toHaveLength(2);
  });
});
