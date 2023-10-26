import React, { useEffect, useState } from 'react';
import styles from './UploadImage.module.css';
import image from './image_logo.png';
import axios from 'axios';

interface Props {
  setBlogState: (url: string) => void;
  imageUrl: string;
}

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dglimzeg9/image/upload';

const UploadImage = ({ imageUrl, setBlogState }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null | string>(
    null
  );

  useEffect(() => {
    setSelectedImage(imageUrl);
  }, [imageUrl]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'tiqc0wxg');

      try {
        const uploadResponse = await axios.post(cloudinaryUrl, formData);
        const imageUrl = uploadResponse.data.url;

        setSelectedImage(imageUrl);
        setBlogState(imageUrl);
        console.log(imageUrl);
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  };

  const handleLogoClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleRemoveImage = () => {
    setBlogState('');
    setSelectedImage(null);
  };

  return (
    <div className={styles.imageUploadContainer} data-testid="fileInput">
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <div className={styles.customLogoContainer} onClick={handleLogoClick}>
        {selectedImage ? (
          <>
            <img
              className={styles.imagePreview}
              src={
                typeof selectedImage === 'string'
                  ? selectedImage
                  : URL.createObjectURL(selectedImage as File)
              }
              data-testid="selectedImage"
              alt="Uploaded Preview"
            />

            <button
              className={styles.removeButton}
              onClick={handleRemoveImage}
              data-testid="removeButton"
            >
              Remove
            </button>
          </>
        ) : (
          <img
            className={styles['custom-logo']}
            src={image}
            alt="Upload Logo"
            data-testid="altImage"
          />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
