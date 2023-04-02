import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImageUpdate() {
  const [id, setId] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [portfolio, setPortfolio] = React.useState(null);
  const [banner, setBanner] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadId();

  }, [])
  const loadId = async () => {
    const { data } = await axios.get('https://multiple-image-in-single-schima.vercel.app/api/v1/images');
    setId(data);
  }
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
    if (profile) {
      const formData = new FormData();
      profile && formData.append("photo", profile);
      await axios.post(`https://multiple-image-in-single-schima.vercel.app/api/v1/updateProfileImage/${id}`, formData);
    }
    if (portfolio) {
      const formData = new FormData();
      portfolio && formData.append("photo", portfolio);
      await axios.post(`https://multiple-image-in-single-schima.vercel.app/api/v1/updatePortfolioImage/${id}`, formData);
    }
    if (banner) {
      const formData = new FormData();
      banner && formData.append("photo", banner);
      await axios.post(`https://multiple-image-in-single-schima.vercel.app/api/v1/updateBannerImage/${id}`, formData);
    }

    navigate('/')

  }
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
            <label style={{ display: "block", padding: "8px", border: "1px solid gray" }}>profile image:</label>
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
            <label style={{ display: "block", padding: "8px", border: "1px solid gray" }}>portfolio image:</label>
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
            <label style={{ display: "block", padding: "8px", border: "1px solid gray" }}>banner image:</label>
            <input className="form-control" type="file" onChange={handleBannerImageChange} />
          </div>
        </div>
        <button className='btn btn-outline-primary' type="submit">Upload Images</button>
      </form>
    </div>
  )
}
