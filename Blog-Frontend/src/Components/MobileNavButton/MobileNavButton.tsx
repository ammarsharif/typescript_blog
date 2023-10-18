import React, { useContext } from 'react';
import styles from './MobileNavButton.module.css';
import { useLocation } from 'react-router-dom';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';

interface MobileNavButtonProps {
  open: boolean;
  handleToggle: () => void;
}

const MobileNavButton: React.FC<MobileNavButtonProps> = ({
  open,
  handleToggle,
}) => {
  const theme = useContext(ThemeContext);
  const { pathname } = useLocation();
  const backgroundColor =
    pathname === BrowserRoutes.HOME ? theme.whiteColor : theme.blackColor;

  const PattyDiv: React.FC = () => <div style={{ backgroundColor }}></div>;
  const navButtonClasses = `${styles.MobileNavButton} ${
    open ? styles.open : ''
  }`;

  return (
    <div
      onClick={handleToggle}
      className={navButtonClasses}
      data-testid="MobileNavButton"
    >
      <PattyDiv />
      <PattyDiv />
      <PattyDiv />
    </div>
  );
};

export default MobileNavButton;
