import React from 'react';
import Blog from '../Blogs/Blogs';
import styles from './BlogsList.module.css';
import BlogData from './BlogData';
import { NavLink } from 'react-router-dom';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';

interface BlogData {
  id: number;
  title: string;
  content: string;
}
// const handleEdit = (id: number) => {
//   const blogToEdit = blogs.find((blog) => blog.id === id);
//   if (blogToEdit) {
//     setSelectedBlog(blogToEdit);
//   }
// };

// const handleDelete = (id: number) => {
//   const updatedBlogs = blogs.filter((blog) => blog.id !== id);
//   setBlogs(updatedBlogs);
//   setSelectedBlog(null);
// };
const BlogList: React.FC = () => {
  return (
    <ContentContainer width={100}>
      <div className={styles['blog_container']}>
        <h1>Blog List</h1>
        <div className={styles['blog_list']}>
          {BlogData.map((blog, index) => (
            <div className={styles.blogsList} key={index}>
              <Blog
                imageSection={<img src={blog.image} alt="BlogImage" />}
                contentSection={
                  <div>
                    <h3>{blog.title}</h3>
                  </div>
                }
                title={''}
                content={''}
              >
                <div>
                  <NavLink to={`/blogslist/${blog.url}`}>
                    <button>Edit</button>
                  </NavLink>
                  <NavLink to={`/blogslist/${blog.url}`}>
                    <button>Delete</button>
                  </NavLink>
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
