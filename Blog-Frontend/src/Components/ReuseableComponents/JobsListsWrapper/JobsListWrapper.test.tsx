import { render, screen } from '@testing-library/react';
import JobsListWrapper from './JobsListsWrapper';
import '../../../jest-extended.d.ts';

describe('JobsListWrapper Component', () => {
  const sampleProps = {
    contentSection: 'Sample Children',
    location: 'Sample Location',
    jobType: 'Sample Job Type',
    contentDate: '2023-10-25',
  };

  it('renders without errors', () => {
    render(<JobsListWrapper {...sampleProps}>Sample Children</JobsListWrapper>);
    expect(screen.getByTestId('jobListWrapper')).toBeTruthy();
  });

  it('renders with required props', () => {
    render(<JobsListWrapper {...sampleProps}>Sample Children</JobsListWrapper>);

    const contentSection = screen.getByTestId('jobListWrapper-contentSection');
    const location = screen.getByTestId('jobListWrapper-location');
    const jobType = screen.getByTestId('jobListWrapper-jobType');
    const contentDate = screen.getByTestId('jobListWrapper-contentDate');

    expect(contentSection.textContent).toBe(sampleProps.contentSection);
    expect(location.textContent).toBe(sampleProps.location);
    expect(jobType.textContent).toBe(sampleProps.jobType);
    expect(contentDate.textContent).toContain(sampleProps.contentDate);
  });

  it('renders children', () => {
    render(<JobsListWrapper {...sampleProps}>Sample Children</JobsListWrapper>);
    const component = screen.getByTestId('jobListWrapper');

    expect(component).toBeTruthy();
  });
});
