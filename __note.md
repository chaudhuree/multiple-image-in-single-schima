## for font end client folder is ready

> for image preview

```

import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [profile, setProfile] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [banner, setBanner] = useState(null);

  const handleImage1Change = (event) => {
    setProfile(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setPortfolio(event.target.files[0]);
  };

  const handlebannerChange = (event) => {
    setBanner(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('profile', profile);
    formData.append('portfolio', portfolio);
    formData.append('banner', banner);

    try {
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Images uploaded successfully');
    } catch (err) {
      console.log(err);
      alert('Failed to upload images');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
      {profile && (
        <img
          src={URL.createObjectURL(profile)}
          alt="Preview"
          style={{ maxWidth: "100%" }}
        />
      )}
        <label>profile image:</label>
        <input type="file" onChange={handleImage1Change} />
      </div>
      <div>
      {portfolio && (
        <img
          src={URL.createObjectURL(portfolio)}
          alt="Preview"
          style={{ maxWidth: "100%" }}
        />
      )}
        <label>portfolio:</label>
        <input type="file" onChange={handleImage2Change} />
      </div>
      <div>
      {banner && (
        <img
          src={URL.createObjectURL(banner)}
          alt="Preview"
          style={{ maxWidth: "100%" }}
        />
      )}
        <label>banner:</label>
        <input type="file" onChange={handleImage3Change} />
      </div>
      <button type="submit">Upload Images</button>
    </form>
  );
};

export default ImageUploader;

```
