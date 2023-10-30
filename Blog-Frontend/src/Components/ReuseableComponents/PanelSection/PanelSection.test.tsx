import { render, screen } from '@testing-library/react';
import PanelSection from './PanelSection';
import '@testing-library/jest-dom';
describe('PanelSection Component', () => {
  it('should render the component with provided props', () => {
    const shadowColor = 'rgba(0, 0, 0, 0.5';
    const backgroundColor = '#ffffff';

    render(
      <PanelSection
        shadowColor={shadowColor}
        backgroundColor={backgroundColor}
      ></PanelSection>
    );
    expect(screen.getByTestId('PanelSection')).toBeInTheDocument();
  });

  it('should render the component with children', () => {
    const shadowColor = 'rgba(0, 0, 0, 0.5';
    const backgroundColor = '#ffffff';

    render(
      <PanelSection shadowColor={shadowColor} backgroundColor={backgroundColor}>
        Sample Children
      </PanelSection>
    );

    const panelSection = screen.getByTestId('PanelSection');
    const children = screen.getByText('Sample Children');

    expect(panelSection).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });
});
