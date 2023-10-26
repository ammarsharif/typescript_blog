import { render, screen, fireEvent } from '@testing-library/react';
import ContentQuillSection from './ContentQuillSection';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
const mockSubmit = jest.fn();

jest.mock('react-quill', () => {
  return {
    __esModule: true,
    default: function ReactQuill({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) {
      return (
        <div data-testid="mocked-quill-editor">
          <textarea value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
      );
    },
  };
});

describe('ContentQuillSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should disable the submit button when any field is empty', () => {
    const blogState = {
      _id: '',
      blogTitle: '',
      blogAuthor: '',
      blogSummary: '',
      blogImageUrl: '',
      blogContent: '',
    };

    render(
      <Router>
        <ContentQuillSection
          blogContent=""
          setBlogState={() => {}}
          handleSubmit={mockSubmit}
          blogState={blogState}
        />
      </Router>
    );

    const submitButton = screen.getByTestId('Form-Submit');

    expect(submitButton).toBeDisabled();
  });

  it('should enable the submit button when all fields are filled', () => {
    const blogState = {
      _id: '123',
      blogTitle: 'Sample Title',
      blogAuthor: 'Sample Author',
      blogSummary: 'Sample Summary',
      blogImageUrl: 'Sample Image URL',
      blogContent: 'Sample Content',
    };

    render(
      <Router>
        <ContentQuillSection
          blogContent=""
          setBlogState={() => {}}
          handleSubmit={mockSubmit}
          blogState={blogState}
        />
      </Router>
    );

    const quillEditor = screen
      .getByTestId('mocked-quill-editor')
      .querySelector('textarea') as HTMLTextAreaElement;

    fireEvent.change(quillEditor, {
      target: { value: 'This is some content' },
    });

    const submitButton = screen.getByTestId('Form-Submit');
    expect(submitButton).not.toBeDisabled();
  });
});
