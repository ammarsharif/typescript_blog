import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './ContentQuillSection.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { useLocation } from 'react-router-dom';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';
import { ModifiedBlogSectionProps } from '../BlogSection/BlogSection';
interface Props {
  setBlogState: (blogContent: string) => void;
  blogContent: string;
  handleSubmit: (e: React.FormEvent) => void;
  blogState: ModifiedBlogSectionProps;
}
const ContentQuillSection: React.FC<Props> = ({
  blogContent,
  setBlogState,
  handleSubmit,
  blogState,
}) => {
  const [quillValue, setQuillValue] = useState('');
  const { pathname } = useLocation();
  useEffect(() => {
    setQuillValue(blogContent);
  }, [blogContent]);
  const handleContentChange = (value: string) => {
    setQuillValue(value);
    setBlogState(value);
  };
  const isDisabled =
    Object.values(blogState)
      .slice(1)
      .some((value) => typeof value === 'string' && value.trim() === '') ||
    quillValue.trim() === '<p><br></p>';
  console.log(isDisabled);
  console.log(quillValue);

  return (
    <ContentContainer width={100}>
      <div
        className={styles['quill_header']}
        data-testid="mocked-ContentQuillSection"
      >
        <div>
          <label style={{ marginTop: '2em' }} data-testid="content-label">
            Content:
          </label>
          <br></br>
          <br></br>
          <ReactQuill
            className={styles['quill-editor']}
            value={quillValue}
            onChange={handleContentChange}
            theme="snow"
          />
        </div>

        <button
          data-testid="Form-Submit"
          className={`${styles['form-button']} ${
            isDisabled ? styles['disabled-button'] : ''
          }`}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {pathname === BrowserRoutes.HOME ? 'Submit' : 'Update'}
        </button>
      </div>
    </ContentContainer>
  );
};

export default ContentQuillSection;
