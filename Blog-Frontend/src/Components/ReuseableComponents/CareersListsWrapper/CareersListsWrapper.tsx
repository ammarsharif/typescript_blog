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
          <div>
            <h4 style={{ color: '#0096FF' }}>{contentSection}</h4>
            <p className={styles.description}>{location}</p>
          </div>
          <p className={styles.jobType}>{jobType}</p>
        </div>
        <div className={styles.buttonList}>{children}</div>
        <div>
          <span style={{ color: '#b3b1b1' }}>
            <SlCalender /> {contentDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareersListWrapper;
