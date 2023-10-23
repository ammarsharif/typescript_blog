import { useContext, useEffect, useState } from 'react';
import styles from './BlogSection.module.css';
import CreateBlog from '../CreateBlog/CreateBlog';
import UploadImage from '../UploadImage/UploadImage';
import ContentQuillSection from '../ContentQuillSection/ContentQuilSection';
import { ThemeContext } from '../ReuseableComponents/ThemeContext/ThemeContext';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API, BrowserRoutes } from '../../Constants/BrowseRoutes';
import { getHeadersData } from '../../Constants/Headers';
import { ThemeProps, blogListProps } from '../GlobalTypes/GlobalTypes';
import { fetchBlogByUrl } from '../../Constants/BlogQueries';
export interface ModifiedBlogSectionProps extends blogListProps {
  _id?: string;
}
const initialBlogState: ModifiedBlogSectionProps = {
  _id: '',
  blogTitle: '',
  blogAuthor: '',
  blogSummary: '',
  blogImageUrl: '',
  blogContent: '',
};

const BlogSection: React.FC<ThemeProps> = () => {
  const theme = useContext(ThemeContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [blogState, setBlogState] =
    useState<ModifiedBlogSectionProps>(initialBlogState);
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
  const { data, isLoading, isError } = useQuery(['blog', blogUrl], () => {
    if (blogUrl) {
      return fetchBlogByUrl(blogUrl);
    }
    return null;
  });
  useEffect(() => {
    if (data) {
      if (blogState._id !== data._id) {
        setBlogState(data);
        console.log('Setting State in IF ');
      }
    } else {
      console.log('Setting ELSE');

      setBlogState(initialBlogState);
    }
  }, [data, blogState._id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (blogState._id) {
      try {
        const response = await axios.put(
          `${BASE_API}/api/blog/${blogState._id}`,
          blogState,
          getHeadersData()
        );
        if (response.data.ok) {
          navigate('/blogs');
          setLoading(false);
        }
        alert('Blog updated successfully.');
      } catch (error) {
        console.error('Error creating a new blog post:', error);
      }
    } else {
      try {
        const NewBlogState = {
          ...blogState,
          blogUrl: createURLFromTitle(blogState.blogTitle),
        };
        delete NewBlogState?._id;
        const response = await axios.post(
          `${BASE_API}/api/blog`,
          NewBlogState,
          getHeadersData()
        );
        const blog = response.data;
        alert('Blog created successfully.');
        console.log(blog, 'Created Blog');

        if (response.data.ok) {
          navigate('/blogs');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error creating a new blog post:', error);
      }
    }
  };
  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading blog posts.</div>;
  }

  const primaryFontStyle = {
    fontFamily: theme.primaryFont,
  };
  return (
    <ContentContainer width={80}>
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
              imageUrl={blogState.blogImageUrl}
              setBlogState={(blogImageUrl: string) =>
                setBlogState({ ...blogState, blogImageUrl })
              }
            />
            <ContentQuillSection
              content={blogState.blogContent}
              setBlogState={(blogContent: string) =>
                setBlogState({ ...blogState, blogContent })
              }
              handleSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </ContentContainer>
  );
};

export default BlogSection;
