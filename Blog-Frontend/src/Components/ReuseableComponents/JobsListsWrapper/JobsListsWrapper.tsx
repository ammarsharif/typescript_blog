import React, { useContext } from 'react';
import { SlCalender } from 'react-icons/sl';
import styles from './jobsListWrapper.module.css';
import { ThemeContext } from '../ThemeContext/ThemeContext';

interface JobsListWrapperProps {
  imageSection?: React.ReactNode;
  contentSection?: React.ReactNode;
  contentDate?: React.ReactNode;
  location?: React.ReactNode;
  jobType?: React.ReactNode;
  secondaryFont?: string;
  children?: React.ReactElement;
}

const JobsListWrapper: React.FC<JobsListWrapperProps> = ({
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
    <div data-testid="jobListWrapper" style={secondaryFontStyle}>
      <div className={styles.jobList}>
        <div className={styles.jobHeader}>
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

export default JobsListWrapper;
