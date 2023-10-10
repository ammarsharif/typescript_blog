import React, { useState } from 'react';
import image from './image_logo.png';
import styles from './UploadImage.module.css';

const UploadImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleLogoClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles['image-upload-container']}>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <div
        className={styles['custom-logo-container']}
        onClick={handleLogoClick}
      >
        {selectedImage ? (
          <>
            <img
              className={styles['image-preview']}
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded Preview"
            />
            <button
              className={styles['remove-button']}
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          </>
        ) : (
          <img
            className={styles['custom-logo']}
            src={image}
            alt="Upload Logo"
          />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
