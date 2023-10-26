import { render, fireEvent, waitFor, act } from '@testing-library/react';
import UploadImage from './UploadImage';

describe('UploadImage Component', () => {
  const setBlogState = jest.fn();
  const imageUrl =
    'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<UploadImage imageUrl={imageUrl} setBlogState={setBlogState} />);
  });

  it('displays the provided image', () => {
    const { getByTestId } = render(
      <UploadImage imageUrl={imageUrl} setBlogState={setBlogState} />
    );

    const selectedImage = getByTestId('selectedImage');

    expect(selectedImage).toBeTruthy();
  });

  it('allows selecting a new image', async () => {
    const { getByTestId } = render(
      <UploadImage imageUrl={imageUrl} setBlogState={setBlogState} />
    );

    const fileInput = getByTestId('fileInput');
    const selectedImage = getByTestId('selectedImage');

    expect(selectedImage).toBeTruthy();

    act(() => {
      fireEvent.change(fileInput, {
        target: {
          files: [new File(['image'], 'image.png')],
        },
      });
    });

    await waitFor(() => {
      const selectedImage = getByTestId('selectedImage');
      expect(selectedImage).toBeTruthy();
    });
  });

  it('allows removing the selected image', () => {
    const { getByTestId, queryByTestId } = render(
      <UploadImage imageUrl={imageUrl} setBlogState={setBlogState} />
    );

    const removeButton = getByTestId('removeButton');
    expect(removeButton).toBeTruthy();

    act(() => {
      fireEvent.click(removeButton);
    });
    const removedRemoveButton = queryByTestId('removeButton');
    expect(removedRemoveButton).toBeNull();

    const selectedImageAfterRemove = queryByTestId('selectedImage');
    expect(selectedImageAfterRemove).toBeNull();
  });
});
