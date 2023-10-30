import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';
import BusinessLogo from '../BusinessLogo/BusinessLogo';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';
import MobileNavButton from '../MobileNavButton/MobileNavButton';
import Logout from '../Logout/Logout';

interface StyledNavLinkProps {
  to: string;
  className?: string;
  fontFamily?: string;
  children: React.ReactNode;
}

const StyledNavLink = (props: StyledNavLinkProps) => {
  const theme = useContext(ThemeContext);

  const color = theme.blackColor;

  const textStyle = {
    color,
    borderColor: color,
    fontFamily: props.fontFamily ?? theme.secondaryFont,
  };

  return (
    <Link style={textStyle} className={props.className ?? ''} to={props.to}>
      {props.children}
    </Link>
  );
};

const NavItems: React.FC = () => {
  return (
    <>
      <ul>
        <li>
          <StyledNavLink to={BrowserRoutes.BLOGLIST}>Blogs</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={BrowserRoutes.JOBSLIST}>Jobs</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={BrowserRoutes.SIGNIN}>SignIn</StyledNavLink>
        </li>
      </ul>
      <ul>
        <li>
          <StyledNavLink to={BrowserRoutes.SIGNIN}>
            <Logout />
          </StyledNavLink>
        </li>
      </ul>
    </>
  );
};

const Header: React.FC = () => {
  const theme = useContext(ThemeContext);

  const backgroundColor = 'white';
  const logo = theme.coloredLogo;
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  const classes = `${styles.MobileNav} ${open ? '' : styles.isHidden}`;

  return (
    <ContentContainer width={90}>
      <div id="home" style={{ backgroundColor }}>
        <nav className={styles.Nav} data-testid="TemplateHeader">
          <StyledNavLink
            to={BrowserRoutes.HOME}
            className={styles.logo}
            fontFamily={theme.primaryFont}
          >
            <BusinessLogo img={logo} size="3.13em" />
            {theme.headerTitle}
          </StyledNavLink>
          <div className={styles.DesktopNav}>
            <NavItems />
          </div>
          <MobileNavButton open={open} handleToggle={handleToggle} />
        </nav>

        <div
          style={{ backgroundColor }}
          data-testid="MobileNavPanel"
          className={classes}
          onClick={(e) => {
            if (e.target !== e.currentTarget) {
              handleToggle();
            }
          }}
        >
          <NavItems />
        </div>
      </div>
    </ContentContainer>
  );
};

export default Header;
