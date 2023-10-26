import { render, screen } from '@testing-library/react';
import PanelSection from './PanelSection';

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
    expect(screen.getByTestId('PanelSection')).toBeTruthy();
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

    expect(panelSection).toBeTruthy();
    expect(children).toBeTruthy();
  });
});
