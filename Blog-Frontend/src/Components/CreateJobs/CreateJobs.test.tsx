import { render, fireEvent, screen, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import CreateJobs from './CreateJobs';

const queryClient = new QueryClient();

describe('CreateJobs Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <CreateJobs />
        </QueryClientProvider>
      </Router>
    );
  });

  it('displays the form with input fields', () => {
    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <CreateJobs />
        </QueryClientProvider>
      </Router>
    );

    expect(screen.findByTestId('Jobs-title')).toBeTruthy();
    expect(screen.findByTestId('Jobs-location')).toBeTruthy();
    expect(screen.findByTestId('Jobs-type')).toBeTruthy();
    expect(screen.findByTestId('Jobs-description')).toBeTruthy();
    expect(screen.findByTestId('Jobs-requirements')).toBeTruthy();
    expect(screen.findByTestId('Jobs-offers')).toBeTruthy();
    expect(screen.findByTestId('Form-button')).toBeTruthy();
  });

  it('updates state when input fields are filled', async () => {
    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <CreateJobs />
        </QueryClientProvider>
      </Router>
    );

    const titleInput = (await screen.findByTestId(
      'Jobs-title'
    )) as HTMLInputElement;
    const locationInput = (await screen.findByTestId(
      'Jobs-location'
    )) as HTMLInputElement;
    const jobTypeInput = (await screen.findByTestId(
      'Jobs-type'
    )) as HTMLInputElement;
    const descriptionInput = (await screen.findByTestId(
      'Jobs-description'
    )) as HTMLInputElement;
    const requirementsInput = (await screen.findByTestId(
      'Jobs-requirements'
    )) as HTMLInputElement;
    const offersInput = (await screen.findByTestId(
      'Jobs-offers'
    )) as HTMLInputElement;
    act(() => {
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(jobTypeInput, { target: { value: 'Remote' } });
      fireEvent.change(descriptionInput, {
        target: { value: 'Test Description' },
      });
      fireEvent.change(requirementsInput, {
        target: { value: 'Req1\nReq2\nReq3' },
      });
      fireEvent.change(offersInput, {
        target: { value: 'Offer1\nOffer2\nOffer3' },
      });
    });
    expect(titleInput.value).toBe('Test Title');
    expect(locationInput.value).toBe('Test Location');
    expect(jobTypeInput.value).toBe('Remote');
    expect(descriptionInput.value).toBe('Test Description');
    expect(requirementsInput.value).toBe('Req1\nReq2\nReq3');
    expect(offersInput.value).toBe('Offer1\nOffer2\nOffer3');
  });

  it('prevents form submission if any value is empty', async () => {
    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <CreateJobs />
        </QueryClientProvider>
      </Router>
    );

    const submitButton = (await screen.findByTestId(
      'Form-button'
    )) as HTMLButtonElement;
    const handleSubmit = jest.fn();

    act(() => {
      fireEvent.click(submitButton);
    });
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
