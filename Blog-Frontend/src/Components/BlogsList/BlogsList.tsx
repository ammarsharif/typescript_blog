import React, { useState } from 'react';
import Blog from '../Blogs/Blogs';
import styles from './BlogsList.module.css';
import { NavLink } from 'react-router-dom';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import AddButton from '../AddButton/AddButton';
import Loader from '../Loader/Loader';
import { blogListProps } from '../GlobalTypes/GlobalTypes';
import { deleteBlog, fetchBlogData } from '../../Constants/BlogQueries';
import Pagination from '../Pagination/Pagination';
export interface ModifiedBlogListProps extends blogListProps {
  _id: string;
}
const BlogList: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data: blogData,
    isLoading,
    isError,
  } = useQuery('blogs', fetchBlogData, {
    cacheTime: 5000,
  });
  const { mutate } = useMutation(deleteBlog, {
    onSettled: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(blogData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const blogsDisplay = blogData?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  const deleteHandler = (blogId: string) => {
    console.log('Deleting blog with ID:', blogId);
    alert('Blog Deleted successfully.');

    mutate(blogId, {
      onSuccess: (deletedBlogId) => {
        blogData?.filter(
          (blog: ModifiedBlogListProps) => blog._id !== deletedBlogId
        );

        console.log('Deleted Blog');
      },
      onError: (error) => {
        console.error('Error deleting the blog post:', error);
      },
    });
  };

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
    <ContentContainer width={75}>
      <div className={styles['blog_container']}>
        <div className={styles['blog_list']}>
          <AddButton
            onClick={handleAddButton}
            width={17.7}
            height={11}
            margin={2.7}
            name="New Blog"
          />
          {blogsDisplay?.map((blog: ModifiedBlogListProps, index: string) => (
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
                  <NavLink to={`/blogs/${blog?.blogUrl}`}>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </ContentContainer>
  );
};

export default BlogList;
