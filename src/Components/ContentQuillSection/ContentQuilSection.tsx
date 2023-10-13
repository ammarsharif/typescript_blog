import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './ContentQuillSection.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import { NavLink, useLocation } from 'react-router-dom';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';
interface Props {
  setBlogState: (content: string) => void;
  blogState: any;
  content?: string;
  handleSubmit: (e: React.FormEvent) => void;
}
const ContentQuilSection = ({
  content,
  blogState,
  setBlogState,
  handleSubmit,
}: Props) => {
  const [quillValue, setQuillValue] = useState('');
  const { pathname } = useLocation();
  useEffect(() => {
    if (content) {
      setQuillValue(content);
    }
  }, [content]);

  console.log('Content', blogState);
  const handleContentChange = (value: string) => {
    setQuillValue(value);
    setBlogState(value);
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

        <NavLink to={'/blogslist'}>
          <button className={styles['form-button']} onClick={handleSubmit}>
            {pathname === BrowserRoutes.HOME ? 'Submit' : 'Update'}
          </button>
          {pathname === BrowserRoutes.HOME ? (
            <NavLink to={'/blogslist'}>
              <button className={styles['buttons']}>Blog List</button>
            </NavLink>
          ) : null}
        </NavLink>
      </div>
    </ContentContainer>
  );
};

export default ContentQuilSection;
