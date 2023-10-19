import React from 'react';

interface BusinessLogoProps {
  img: string;
  size?: string;
  className?: string;
}

const BusinessLogo: React.FC<BusinessLogoProps> = ({
  img,
  size = '3em',
  className = '',
}) => {
  const style = {
    width: size,
    height: 'auto',
  };
  return (
    <img
      data-testid="BusinessLogo"
      src={img}
      style={style}
      alt="Business Logo"
      className={className}
    />
  );
};
export default BusinessLogo;
