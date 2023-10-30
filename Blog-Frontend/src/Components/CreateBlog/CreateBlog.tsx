import React from 'react';
import styles from './CreateBlog.module.css';

interface CreateBlogProps {
  setBlogState: (fieldName: string, value: string) => void;
  blogState: {
    blogTitle?: string;
    blogAuthor?: string;
    blogSummary?: string;
  };
}

const CreateBlog: React.FC<CreateBlogProps> = ({ setBlogState, blogState }) => {
  const handleStateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlogState(name, value);
  };

  return (
    <div data-testid="Create-Blog">
      <form className={styles['form-container']}>
        <div>
          <label htmlFor="blogTitle" className={styles['form-label']}>
            Title:
          </label>
          <input
            id="blogTitle"
            className={styles['form-input']}
            type="text"
            name="blogTitle"
            value={blogState.blogTitle}
            placeholder="Blog Title"
            onChange={handleStateChange}
          />
        </div>
        <div>
          <label htmlFor="blogAuthor" className={styles['form-label']}>
            Author:
          </label>
          <input
            id="blogAuthor"
            className={styles['form-input']}
            type="text"
            name="blogAuthor"
            value={blogState.blogAuthor}
            placeholder="Author"
            onChange={handleStateChange}
          />
        </div>
        <div>
          <label htmlFor="blogSummary" className={styles['form-label']}>
            Summary:
          </label>
          <textarea
            id="blogSummary"
            data-testid="message"
            required
            name="blogSummary"
            value={blogState?.blogSummary}
            rows={10}
            onChange={handleStateChange}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
