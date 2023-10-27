import { render, screen } from '@testing-library/react';
import ContentContainer from './ContentContainer';
import '@testing-library/jest-dom';
describe('ContentContainer Component', () => {
  describe('without children', () => {
    it('contains no children', () => {
      const width = 120;

      render(<ContentContainer width={width} />);
      const contentContainer = screen.getByTestId('ContentContainer');
      expect(contentContainer.children.length).toBe(0);
    });
  });

  describe('with children', () => {
    it('renders children', () => {
      const width = 120;
      render(
        <ContentContainer width={width}>
          <div>Child Component</div>
        </ContentContainer>
      );

      const childComponent = screen.getByText('Child Component');
      expect(childComponent).toBeInTheDocument();
    });
  });

  describe('max-width', () => {
    it('It has default max-width = 100em', () => {
      render(<ContentContainer />);
      const contentContainer = screen.getByTestId('ContentContainer');
      const computedStyle = window.getComputedStyle(contentContainer);
      expect(computedStyle.maxWidth).toBe('100em');
    });

    it('uses width prop to set max-width in em', () => {
      const width = 120;

      render(<ContentContainer width={width} />);
      const contentContainer = screen.getByTestId('ContentContainer');
      const computedStyle = window.getComputedStyle(contentContainer);
      expect(computedStyle.maxWidth).toBe('120em');
    });
  });
});
