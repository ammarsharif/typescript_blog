import React, { useContext } from 'react';
import { SlCalender } from 'react-icons/sl';
import styles from './CareersListWrapper.module.css';
import { ThemeContext } from '../ThemeContext/ThemeContext';

interface CareersListWrapperProps {
  imageSection?: React.ReactNode;
  contentSection?: React.ReactNode;
  contentDate?: React.ReactNode;
  location?: React.ReactNode;
  jobType?: React.ReactNode;
  secondaryFont?: string;
  children?: React.ReactElement;
}

const CareersListWrapper: React.FC<CareersListWrapperProps> = ({
  contentSection,
  location,
  jobType,
  contentDate,
  children,
}) => {
  const theme = useContext(ThemeContext);
  const secondaryFontStyle = {
    fontFamily: theme.secondaryFont,
  };

  return (
    <div data-testid="CareerListWrapper" style={secondaryFontStyle}>
      <div className={styles.careerList}>
        <div className={styles.careerHeader}>
          <div style={{ display: 'flex', alignItems: 'center', margin: '0em' }}>
            <h4 style={{ color: '#0096FF' }}>{contentSection}</h4>
            <p style={{ marginLeft: '1em', color: 'gray' }}>{jobType}</p>
          </div>

          <p className={styles.description}>{location}</p>
          <div className={styles.buttonList}>{children}</div>
          <div>
            <span style={{ color: '#b3b1b1' }}>
              <SlCalender /> {contentDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersListWrapper;
