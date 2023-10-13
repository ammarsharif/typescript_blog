import { useContext, useEffect, useState } from 'react';
import styles from './BlogSection.module.css';
import CreateBlog from '../CreateBlog/CreateBlog';
import UploadImage from '../UploadImage/UploadImage';
import ContentQuillSection from '../ContentQuillSection/ContentQuilSection';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';
import {
  BASE_API,
  BrowserRoutes,
  getAuthToken,
  getHeadersData,
} from '../../Constants/BrowseRoutes';

interface BlogSectionProps {
  primaryFont?: string;
  secondaryFont?: string;
  primaryColor?: string;
}

const BlogSection: React.FC<BlogSectionProps> = () => {
  const theme = useContext(ThemeContext);
  const { pathname } = useLocation();
  const [blogState, setBlogState] = useState({
    id: '',
    title: '',
    author: '',
    summary: '',
    imageUrl: '',
    content: '',
  });
  const [Loading, setLoading] = useState(false);
  const { blogUrl } = useParams();
  function createURLFromTitle(blogTitle: string) {
    let url = blogTitle
      .replace(/[^\w\s-]/g, '')
      .trim()
      .toLowerCase();
    url = url.replace(/[\s]/g, '-');
    url = encodeURI(url);
    if (url.length > 100) {
      url = url.substring(0, 100);
    }
    return url;
  }
  const newBlogData = {
    blogTitle: blogState.title,
    blogAuthor: blogState.author,
    blogSummary: blogState?.summary,
    blogImageUrl: blogState.imageUrl,
    blogContent: blogState.content,
    blogUrl: createURLFromTitle(blogState.title),
  };
  console.log(blogState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pathname === BrowserRoutes.HOME) {
      try {
        const response = await axios.post(
          `${BASE_API}/api/blog `,
          newBlogData,
          getHeadersData()
        );
        const blog = response.data;

        alert('Blog created successfully.');
        console.log(blog, 'Created Blog');
        setBlogState({
          id: blog._id || '',
          title: blog.blogTitle || '',
          summary: blog.blogSummary || '',
          author: blog.blogAuthor || '',
          content: blog.blogContent || '',
          imageUrl: blog.blogImageUrl || '',
        });
        if (response.data.ok) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error creating a new blog post:', error);
      }
    }
    if (blogUrl) {
      try {
        const response = await axios.put(
          `${BASE_API}/api/blog/${blogState.id}`,
          newBlogData,
          getHeadersData()
        );
        const blog = response.data;
        if (response.data.ok) {
          setLoading(false);
        }
        alert('Blog updated successfully.');
        console.log(blog, 'Updated Blog');
      } catch (error) {
        console.error('Error creating a new blog post:', error);
      }
    }
  };
  useEffect(() => {
    console.log(getAuthToken());

    const getUrlData = async () => {
      try {
        const response = await axios.get(`${BASE_API}/api/blog/${blogUrl}`);
        const blog = response.data.data;
        console.log(blog, 'blog');
        setBlogState({
          id: blog._id || '',
          title: blog.blogTitle || '',
          summary: blog?.blogSummary || '',
          author: blog.blogAuthor || '',
          content: blog.blogContent || '',
          imageUrl: blog.blogImageUrl || '',
        });
        if (response.data.ok) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching single blog post:', error);
      }
    };
    if (blogUrl) {
      console.log('runs');
      getUrlData();
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
        {Loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <div>
            <CreateBlog
              blogState={blogState}
              setBlogState={(fieldName, value) =>
                setBlogState({ ...blogState, [fieldName]: value })
              }
            />
            <UploadImage
              imageUrl={blogState.imageUrl}
              setBlogState={(imageUrl: string) =>
                setBlogState({ ...blogState, imageUrl })
              }
            />
            <ContentQuillSection
              content={blogState.content}
              setBlogState={(content: string) =>
                setBlogState({ ...blogState, content })
              }
              blogState={blogState}
              handleSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </ContentContainer>
  );
};

export default BlogSection;
