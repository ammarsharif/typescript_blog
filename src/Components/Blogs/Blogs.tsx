import React, { useContext } from 'react';
import styles from './Blogs.module.css';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';

interface BlogProps {
  title: string;
  content: string;
  imageSection?: React.ReactElement;
  contentSection?: React.ReactElement;
  contentDate?: React.ReactNode;
  children?: React.ReactElement;
}

const Blog: React.FC<BlogProps> = ({
  contentSection,
  imageSection,
  children,
}) => {
  const theme = useContext(ThemeContext);
  const secondaryFontStyle = {
    fontFamily: theme.secondaryFont,
  };
  return (
    <div data-testid="BlogListWrapper" style={secondaryFontStyle}>
      <div className={styles.bannerList}>
        {imageSection}
        <div className={styles.dataBlog}>
          <h4 style={{ color: '#ffff' }}>{contentSection}</h4>
          <div className={styles.buttonList}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
