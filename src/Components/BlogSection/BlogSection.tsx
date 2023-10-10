import { useContext } from 'react';
import styles from './BlogSection.module.css';
import CreateBlog from '../CreateBlog/CreateBlog';
import UploadImage from '../UploadImage/UploadImage';
import ContentQuillSection from '../ContentQuillSection/ContentQuilSection';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';
import BlogData from '../BlogsList/BlogData';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { useParams } from 'react-router-dom';
interface BlogSectionProps {
  primaryFont?: string;
  secondaryFont?: string;
  primaryColor?: string;
}
const BlogSection: React.FC<BlogSectionProps> = () => {
  const theme = useContext(ThemeContext);
  const { blogUrl } = useParams<{ blogUrl: string }>();
  const selectedBlog = BlogData.find((blog) => blog.url === blogUrl);
  const primaryFontStyle = {
    fontFamily: theme.primaryFont,
  };
  if (selectedBlog) {
    return (
      <ContentContainer width={70}>
        <div className={styles.bannerWrapper}>
          <div className={styles.header}>
            <h3 style={primaryFontStyle} className={styles.heading}>
              Add Blog Post
            </h3>
          </div>
          <CreateBlog />
          <UploadImage />
          <ContentQuillSection />
        </div>
      </ContentContainer>
    );
  } else {
    <ContentContainer width={70}>
      <div className={styles.bannerWrapper}>
        <div className={styles.header}>
          <h3 style={primaryFontStyle} className={styles.heading}>
            Add Blog Post
          </h3>
        </div>
        <CreateBlog />
        <UploadImage />
        <ContentQuillSection />
      </div>
    </ContentContainer>;
  }
};

export default BlogSection;
