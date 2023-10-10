import React, { useState } from 'react';
import styles from './CreateBlog.module.css';

interface CreateBlogProps {
  secondaryFont?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateBlog: React.FC<CreateBlogProps> = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };
  const handleSummaryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSummary(e.target.value);
  };

  return (
    <div className={styles.contactForm} data-testid="Contact-From">
      <form className={styles['form-container']}>
        <div>
          <label className={styles['form-label']}>Title:</label>
          <input
            className={styles['form-input']}
            type="text"
            value={title}
            placeholder="Blog Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label className={styles['form-label']}>Author:</label>
          <input
            className={styles['form-input']}
            type="text"
            value={author}
            placeholder="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <label className={styles['form-label']}>Summary:</label>
          <textarea
            data-testid="message"
            required
            name="message"
            placeholder="How can we help you?"
            value={summary}
            rows={10}
            onChange={(e) => handleSummaryChange(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
