import React, { useContext } from 'react';
import styles from './Blogs.module.css';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';
import { BlogProps } from '../GlobalTypes/GlobalTypes';

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
