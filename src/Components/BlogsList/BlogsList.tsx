import React, { useEffect, useState } from 'react';
import Blog from '../Blogs/Blogs';
import styles from './BlogsList.module.css';
import { NavLink } from 'react-router-dom';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import axios from 'axios';
import { BASE_API } from '../../Constants/BrowseRoutes';

const BlogList: React.FC = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API}/api/blogs`);

        if (response.data.ok) {
          const blogList = response.data.data;
          setBlogData(blogList);
          setLoading(true);
        }
      } catch (error) {
        console.error('Error fetching all blog posts:', error);
      }
    };

    fetchData();
  }, []);
  const deleteHandler = async (blogId: string) => {
    console.log('Deleting blog with ID:', blogId);
    try {
      const response = await axios.delete(`${BASE_API}/api/blog/${blogId}`);
      console.log('Delete response:', response);

      if (response.status === 204) {
        alert('Blog Deleted successfully.');
        console.log('Deleted Blog');
      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error deleting the blog post:', error);
    }
  };
  return (
    <ContentContainer width={100}>
      <div className={styles['blog_container']}>
        <h1>Blog List</h1>
        <div className={styles['blog_list']}>
          {loading ? (
            <div className={styles.loaderWrapper}>
              <div className={styles.loader}></div>
            </div>
          ) : (
            blogData?.map((blog: any, index) => (
              <div className={styles.blogsList} key={index}>
                <Blog
                  imageSection={
                    <img src={blog?.blogImageUrl} alt="BlogImage" />
                  }
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
            ))
          )}
        </div>
      </div>
    </ContentContainer>
  );
};

export default BlogList;
