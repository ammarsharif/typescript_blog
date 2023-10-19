import React, { ReactNode } from 'react';

export interface PanelSectionProps {
  shadow?: boolean;
  shadowColor?: string;
  backgroundColor?: string;
  className?: string;
  children?: ReactNode;
}

const PanelSection: React.FC<PanelSectionProps> = ({
  shadow = true,
  shadowColor = '#e3e3e3',
  backgroundColor = 'white',
  className = '',
  children,
}) => {
  const style = {
    boxShadow: shadow ? `0.1em 0.3em 1em ${shadowColor}` : 'none',
    backgroundColor,
    borderRadius: '1em',
  };

  return (
    <div className={className} style={style} data-testid="PanelSection">
      {children}
    </div>
  );
};

export default PanelSection;
