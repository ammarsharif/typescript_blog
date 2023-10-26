import React, { useContext } from 'react';
import styles from './Blogs.module.css';
import { BlogProps } from '../../GlobalTypes/GlobalTypes';
import { ThemeContext } from '../ThemeContext/ThemeContext';

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
      <div className={styles.bannerList} data-testid="BlogListWrapper-image">
        {imageSection}
        <div className={styles.dataBlog}>
          <h4 style={{ color: '#ffff' }} data-testid="BlogListWrapper-content">
            {contentSection}
          </h4>
          <div className={styles.buttonList}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
