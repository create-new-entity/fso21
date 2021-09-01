import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import CreateNewBlogForm from './CreateNewBlogForm';


describe('<CreateNewBlogForm/> Component tests', () => {
  let component;

  const mockAddNewBlog = jest.fn();

  beforeEach(() => {
    component = render(<CreateNewBlogForm createNewBlogSubmitHandler={mockAddNewBlog}/>);
  });


  test('Create new form handler gets called with the right details', () => {
    const titleInput = component.container.querySelector('#title');
    const authorInput = component.container.querySelector('#author');
    const urlInput = component.container.querySelector('#url');

    const inputData = {
      title: 'Some random blog',
      author: 'Random Person',
      url: 'random.com'
    };

    fireEvent.change(titleInput, {
      target: {
        value: inputData.title
      }
    });

    fireEvent.change(authorInput, {
      target: {
        value: inputData.author
      }
    });

    fireEvent.change(urlInput, {
      target: {
        value: inputData.url
      }
    });

    const form = component.container.querySelector('form');
    fireEvent.submit(form);

    expect(mockAddNewBlog).toHaveBeenCalledTimes(1);
    expect(mockAddNewBlog.mock.calls[0][0].target.elements['title'].value).toBe(inputData.title);
    expect(mockAddNewBlog.mock.calls[0][0].target.elements['author'].value).toBe(inputData.author);
    expect(mockAddNewBlog.mock.calls[0][0].target.elements['url'].value).toBe(inputData.url);
  });
});

