import React from 'react';
import Blog from '../Blogs/Blogs';
import styles from './BlogsList.module.css';
import { NavLink } from 'react-router-dom';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { BASE_API, getHeadersData } from '../../Constants/BrowseRoutes';
import AddButton from '../AddButton/AddButton';
import Loader from '../Loader/loader';
interface BlogsProps {
  blogImage: string;
  blogTitle: string;
  _id: string;
  blogAuthor: string;
  blogSummary: string;
  blogContent: string;
  blogUrl: string;
}
const fetchBlogData = async () => {
  const response = await axios.get(`${BASE_API}/api/blogs`);
  if (response.data.ok) {
    return response.data.data;
  } else {
    throw new Error('Error fetching blog data');
  }
};

const deleteBlog = async (blogId: string) => {
  const response = await axios.delete(
    `${BASE_API}/api/blog/${blogId}`,
    getHeadersData()
  );

  if (response.status === 204) {
    return blogId;
  } else {
    throw new Error(`Unexpected status code: ${response.status}`);
  }
};

const BlogList: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: blogData,
    isLoading,
    isError,
  } = useQuery('blogs', fetchBlogData);
  const { mutate } = useMutation(deleteBlog, {
    onSettled: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  const deleteHandler = (blogId: string) => {
    console.log('Deleting blog with ID:', blogId);

    mutate(blogId, {
      onSuccess: (deletedBlogId) => {
        blogData?.filter((blog: BlogsProps) => blog._id !== deletedBlogId);

        alert('Blog Deleted successfully.');
        console.log('Deleted Blog');
      },
      onError: (error) => {
        console.error('Error deleting the blog post:', error);
      },
    });
  };
  const navigate = useNavigate();
  const handleAddButton = () => {
    navigate('/');
  };
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading blog posts.</div>;
  }

  return (
    <ContentContainer width={100}>
      <div className={styles['blog_container']}>
        <h1>Blog List</h1>
        <div className={styles['blog_list']}>
          <AddButton
            onClick={handleAddButton}
            width={18}
            height={11}
            margin={2.7}
            name="New Blog"
          />
          {blogData?.map((blog: any, index: string) => (
            <div className={styles.blogsList} key={index}>
              <Blog
                imageSection={<img src={blog?.blogImageUrl} alt="BlogImage" />}
                contentSection={
                  <div>
                    <h3>{blog?.blogTitle}</h3>
                  </div>
                }
              >
                <div>
                  <NavLink to={`/blogslist/${blog?.blogUrl}`}>
                    <button>Edit</button>
                  </NavLink>
                  <button onClick={() => deleteHandler(blog._id)}>
                    Delete
                  </button>
                </div>
              </Blog>
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
};

export default BlogList;
