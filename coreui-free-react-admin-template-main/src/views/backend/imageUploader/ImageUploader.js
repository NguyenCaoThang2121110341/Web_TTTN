import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Image } from 'react-bootstrap';

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        imagesArray.push(reader.result);
        if (imagesArray.length === files.length) {
          setSelectedImages([...selectedImages, ...imagesArray]);
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="imageInput"
      />
      <label htmlFor="imageInput">
        <Button component="span">
          Choose Images
        </Button>
      </label>
      {selectedImages.map((image, index) => (
        <div key={index}>
          <Image src={image} alt={`Selected ${index}`} width={80} />
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
