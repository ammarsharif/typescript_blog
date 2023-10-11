import { useContext, useEffect, useState } from 'react';
import styles from './BlogSection.module.css';
import CreateBlog from '../CreateBlog/CreateBlog';
import UploadImage from '../UploadImage/UploadImage';
import ContentQuillSection from '../ContentQuillSection/ContentQuilSection';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { useLocation, useParams } from 'react-router';
import BlogData from '../BlogsList/BlogData';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';

interface BlogSectionProps {
  primaryFont?: string;
  secondaryFont?: string;
  primaryColor?: string;
}

const BlogSection: React.FC<BlogSectionProps> = () => {
  const theme = useContext(ThemeContext);
  const { pathname } = useLocation();
  const [blogState, setBlogState] = useState({
    title: '',
    author: '',
    summary: '',
    imageUrl: '',
    content: '',
  });
  const { blogUrl } = useParams();
  useEffect(() => {
    if (blogUrl) {
      const blog = BlogData.find((blog) => blog.url === blogUrl);
      if (blog) {
        setBlogState({
          title: blog.title,
          summary: blog.summary,
          author: blog.author,
          content: blog.content,
          imageUrl: blog.image || '',
        });
      }
    }
  }, [blogUrl]);
  const primaryFontStyle = {
    fontFamily: theme.primaryFont,
  };
  return (
    <ContentContainer width={70}>
      <div className={styles.bannerWrapper}>
        <div className={styles.header}>
          <h3 style={primaryFontStyle} className={styles.heading}>
            {pathname === BrowserRoutes.HOME ? 'Add' : 'Edit'} Blog Post
          </h3>
        </div>
        <CreateBlog
          blogState={blogState}
          setBlogState={(fieldName, value) =>
            setBlogState({ ...blogState, [fieldName]: value })
          }
        />
        <UploadImage imageUrl={blogState.imageUrl} />
        <ContentQuillSection content={blogState.content} />
      </div>
    </ContentContainer>
  );
};

export default BlogSection;
