import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BlogsList from './BlogsList';
import { BASE_API } from '../../Constants/BrowseRoutes';
const mockData = [
  {
    _id: '1',
    blogTitle: 'Test Blog 1',
    blogImageUrl: 'test-image-1.jpg',
    blogUrl: 'test-blog-1',
  },
  {
    _id: '2',
    blogTitle: 'Test Blog 2',
    blogImageUrl: 'test-image-2.jpg',
    blogUrl: 'test-blog-2',
  },
];

const queryClient = new QueryClient();

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: jest.fn(() => ({
    data: mockData,
    isLoading: false,
    isError: false,
  })),
  useMutation: jest.fn((mutationFunction) => ({
    mutate: jest.fn((...args) => mutationFunction(...args)),
  })),
}));

describe('BlogsList', () => {
  it('renders the component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BlogsList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByTestId('blogContainer')).toBeInTheDocument();
    expect(screen.getAllByTestId('blogWrapper')).toHaveLength(2);
    expect(screen.getAllByText(/Edit/)).toHaveLength(2);
    expect(screen.getAllByText('Delete')).toHaveLength(2);
  });
  it('handles button clicks', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BlogsList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const editButtons = screen.getAllByText('Edit');
    const deleteButtons = screen.getAllByText('Delete');
    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  const mock = new MockAdapter(axios);
  const blogIdToDelete = '1';
  mock.onDelete(`${BASE_API}/api/blog/${blogIdToDelete}`).reply(204);
  mock.onGet(`${BASE_API}/api/blogs`).reply(200, mockData);

  it('handles blog deletion', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BlogsList />
        </MemoryRouter>
      </QueryClientProvider>
    );
    await waitFor(() => screen.getByTestId('blogContainer'));
    const deleteButton = screen.getAllByTestId('deleteButton')[0];
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.queryByText('Blog Title 1')).toBeNull();
    });
  });
});
