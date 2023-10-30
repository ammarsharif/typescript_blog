import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import JobsList from './JobsList';
import '@testing-library/jest-dom';
import { BASE_API } from '../../Constants/BrowseRoutes';

const mockData = [
  {
    _id: '1',
    title: 'Job Title 1',
    location: 'Location 1',
    datePosted: new Date(),
    jobType: 'Full-Time',
  },
  {
    _id: '2',
    title: 'Job Title 2',
    location: 'Location 2',
    datePosted: new Date(),
    jobType: 'Part-Time',
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
}));

describe('JobsList', () => {
  it('renders the component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByTestId('jobContainer')).toBeInTheDocument();
    expect(screen.getAllByTestId('jobWrapper')).toHaveLength(2);
    expect(screen.getAllByText('Edit')).toHaveLength(2);
    expect(screen.getAllByText('Delete')).toHaveLength(2);
  });

  it('handles button clicks', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const editButtons = screen.getAllByText('Edit');
    const deleteButtons = screen.getAllByText('Delete');
    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  const mock = new MockAdapter(axios);
  const jobIdToDelete = '1';
  mock.onDelete(`${BASE_API}/api/job/${jobIdToDelete}`).reply(204);
  mock.onGet(`${BASE_API}/api/jobs`).reply(200, mockData);

  it('handles job deletion', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <JobsList />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByTestId('jobContainer'));
    const deleteButton = screen.getAllByTestId('deleteButton')[0];
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.queryByText('Job Title of the deleted job')).toBeNull();
    });
  });
});
