import { render, screen, fireEvent } from '@testing-library/react';
import CreateBlog from './CreateBlog';

// Mock the function passed as a prop
const mockSetBlogState = jest.fn();

const mockBlogState = {
  blogTitle: 'Test Title',
  blogAuthor: 'Test Author',
  blogSummary: 'Test Summary',
};

beforeEach(() => {
  render(
    <CreateBlog setBlogState={mockSetBlogState} blogState={mockBlogState} />
  );
});

test('renders CreateBlog component', () => {
  const createBlogElement = screen.getByTestId('Create-Blog');
  expect(createBlogElement).toBeTruthy();
});

test('handles input change and calls setBlogState', () => {
  const titleInput = screen.getByLabelText('Title:');
  const authorInput = screen.getByLabelText('Author:');
  const summaryInput = screen.getByLabelText('Summary:');

  fireEvent.change(titleInput, { target: { value: 'New Title' } });
  fireEvent.change(authorInput, { target: { value: 'New Author' } });
  fireEvent.change(summaryInput, { target: { value: 'New Summary' } });

  expect(mockSetBlogState).toHaveBeenCalledTimes(3);
  expect(mockSetBlogState).toHaveBeenCalledWith('blogTitle', 'New Title');
  expect(mockSetBlogState).toHaveBeenCalledWith('blogAuthor', 'New Author');
  expect(mockSetBlogState).toHaveBeenCalledWith('blogSummary', 'New Summary');
});
