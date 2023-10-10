import React from 'react';
import styles from './CreateBlog.module.css';

interface CreateBlogProps {
  setBlogState: (fieldName?: string, value?: string) => void;
  blogState: {
    title?: string;
    author?: string;
    summary?: string;
    imageUrl?: string;
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
    <div className={styles.contactForm} data-testid="Contact-From">
      <form className={styles['form-container']}>
        <div>
          <label className={styles['form-label']}>Title:</label>
          <input
            className={styles['form-input']}
            type="text"
            name="title"
            value={blogState.title}
            placeholder="Blog Title"
            onChange={handleStateChange}
          />
        </div>
        <div>
          <label className={styles['form-label']}>Author:</label>
          <input
            className={styles['form-input']}
            type="text"
            name="author"
            value={blogState.author}
            placeholder="Author"
            onChange={handleStateChange}
          />
        </div>
        <div>
          <label className={styles['form-label']}>Summary:</label>
          <textarea
            data-testid="message"
            required
            name="summary"
            value={blogState.summary}
            rows={10}
            onChange={handleStateChange}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
