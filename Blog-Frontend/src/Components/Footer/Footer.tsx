import React, { useContext } from 'react';
import {
  CallIcon,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
} from './FooterIconsSvg';
import styles from './Footer.module.css';

import { Link } from 'react-router-dom';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';

import BusinessLogo from '../BusinessLogo/BusinessLogo';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import PanelSection from '../ReuseableComponents/PanelSection/PanelSection';

interface FooterProps {}
const Footer: React.FC<FooterProps> = () => {
  const {
    blackColor,
    coloredLogo,
    primaryColor,
    phoneNumber,
    email,
    secondaryFont,
    primaryFont,
    socialMediaLinks,
  } = useContext(ThemeContext);
  const { linkedin, facebook } = socialMediaLinks;
  const primaryFontStyle: React.CSSProperties = {
    fontFamily: primaryFont,
  };
  const textStyle: React.CSSProperties = {
    color: blackColor,
    fontFamily: secondaryFont,
  };
  const navLinkStyle: React.CSSProperties = {
    ...textStyle,
    cursor: 'pointer',
  };
  const panelProps = {
    className: styles.FooterPanel,
    backgroundColor: '#c1c1c129',
    shadow: false,
  };

  const scroll = (id: string) => {
    window.scrollTo({
      top: document.getElementById(id)?.offsetTop || 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className={styles.TemplateFooter} data-testid="TemplateFooter">
      <PanelSection {...panelProps}>
        <ContentContainer width={65}>
          <div className={styles.FooterNavLinks} style={textStyle}>
            <div className={styles.FooterNavColumn}>
              <h4 style={primaryFontStyle}>Get in touch</h4>
              <ul>
                <li>
                  <Link style={navLinkStyle} to={`tel:${phoneNumber}`}>
                    <CallIcon backgroundColor={primaryColor} /> {phoneNumber}
                  </Link>
                </li>
                <li>
                  <Link style={navLinkStyle} to={`mailto:${email}`}>
                    <MailIcon backgroundColor={primaryColor} /> {email}
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.FooterNavColumn}>
              <h4 style={primaryFontStyle}>Navigation</h4>
              <ul>
                <li>
                  <Link to={BrowserRoutes.BLOGLIST}>
                    <span style={navLinkStyle}>Blogs</span>
                  </Link>
                </li>
                <li>
                  <Link to={BrowserRoutes.JOBSLIST}>
                    <span style={navLinkStyle}>Jobs</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.FooterNavColumn}>
              <h4 style={primaryFontStyle}>Follow Us</h4>
              <ul className={styles.socialIcons}>
                <li>
                  <Link target={'_blank'} style={navLinkStyle} to={linkedin}>
                    <LinkedinIcon backgroundColor={primaryColor} />
                  </Link>
                </li>
                <li>
                  <Link target={'_blank'} style={navLinkStyle} to={facebook}>
                    <FacebookIcon backgroundColor={primaryColor} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.FooterBranding}>
            <div
              className={styles.FooterLogoContainer}
              onClick={() => scroll('home')}
            >
              <Link className={styles.FooterLogo} to={BrowserRoutes.HOME}>
                <BusinessLogo img={coloredLogo} size="2em" />
              </Link>
            </div>
          </div>
        </ContentContainer>
      </PanelSection>
    </div>
  );
};

export default Footer;
