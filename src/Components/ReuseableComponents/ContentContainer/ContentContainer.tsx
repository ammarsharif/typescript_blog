import React from 'react';

interface ContentContainerProps {
  width?: number;
  className?: string;
  children: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  width = 100,
  className = '',
  children,
}) => {
  const componentStyle = {
    maxWidth: width + 'em',
    margin: '0 auto',
  };

  return (
    <div
      className={className}
      data-testid="ContentContainer"
      style={componentStyle}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
