import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUploader = () => {
  const [profile, setProfile] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [banner, setBanner] = useState('');

  const navigate = useNavigate();

  const handleProfileImageChange = (event) => {
    setProfile(event.target.files[0]);
  };

  const handlePortfolioImageChange = (event) => {
    setPortfolio(event.target.files[0]);
  };

  const handleBannerImageChange = (event) => {
    setBanner(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('profile', profile);
    formData.append('portfolio', portfolio);
    formData.append('banner', banner);

    try {
      await axios.post("http://localhost:5000/api/v1/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Images uploaded successfully');
      navigate('/');


    } catch (err) {
      console.log(err);
      alert('Failed to upload images');
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-md-4 mb-3">
            {profile && (
              <img
                src={URL.createObjectURL(profile)}
                alt="Preview"
                style={{ maxWidth: "100%" }}
              />
            )}
            <label style={{display:"block",padding:"8px",border:"1px solid gray"}}>profile image:</label>
            <input className="form-control" type="file" onChange={handleProfileImageChange} />
          </div>
          <div className="col-md-4 mb-3">
            {portfolio && (
              <img
                src={URL.createObjectURL(portfolio)}
                alt="Preview"
                style={{ maxWidth: "100%" }}
              />
            )}
            <label style={{display:"block",padding:"8px",border:"1px solid gray"}}>portfolio image:</label>
            <input className="form-control" type="file" onChange={handlePortfolioImageChange} />
          </div>
          <div className="col-md-4 mb-3">
            {banner && (
              <img
                src={URL.createObjectURL(banner)}
                alt="Preview"
                style={{ maxWidth: "100%" }}
              />
            )}
            <label style={{display:"block",padding:"8px",border:"1px solid gray"}}>banner image:</label>
            <input className="form-control" type="file" onChange={handleBannerImageChange} />
          </div>
        </div>
        <button className='btn btn-outline-primary' type="submit">Upload Images</button>
      </form>
    </div>
  );
};

export default ImageUploader;
