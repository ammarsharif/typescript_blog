import { render, screen } from '@testing-library/react';
import Blog from './Blogs';

const sampleProps = {
  contentSection: 'Sample Content',
  imageSection: <img src="./bg2.png" alt="Sample Image" />,
};

describe('Blog Component', () => {
  it('renders without children', () => {
    render(<Blog {...sampleProps} />);
    const image = screen.getByTestId('BlogListWrapper-image');
    const contentSection = screen.getByTestId('BlogListWrapper-content');
    expect(image).toBeTruthy();
    expect(contentSection.textContent).toBe(sampleProps.contentSection);
  });

  it('renders with children', () => {
    const { getByAltText, getByText } = render(
      <Blog {...sampleProps}>Sample Children</Blog>
    );
    const image = getByAltText('Sample Image');
    const children = getByText('Sample Children');
    expect(image).toBeTruthy();
    expect(children).toBeTruthy();
  });
});
