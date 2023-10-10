import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './ContentQuillSection.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';

const ContentQuilSection = () => {
  const [quillValue, setQuillValue] = useState('');

  const handleContentChange = (value: string) => {
    setQuillValue(value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <ContentContainer width={70}>
      <div className={styles['quill_header']}>
        <div>
          <label style={{ marginTop: '2em' }}>Content:</label>
          <br></br>
          <br></br>
          <ReactQuill
            className={styles['quill-editor']}
            value={quillValue}
            onChange={handleContentChange}
            theme="snow"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <button className={styles['form-button']} type="submit">
            Submit
          </button>
        </form>
      </div>
    </ContentContainer>
  );
};

export default ContentQuilSection;
