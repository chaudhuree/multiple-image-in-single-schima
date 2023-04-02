import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function ViewImage() {
  const [id, setId] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(null);
  const [portfolioImage, setPortfolioImage] = React.useState(null);
  const [bannerImage, setBannerImage] = React.useState(null);
  useEffect(() => {
    loadId();

  }, [])
  const loadId = async () => {
    const { data } = await axios.get('https://multiple-image-in-single-schima.vercel.app/api/v1/images');
    setId(data);
  }
  const deleteall = async () => {
    await axios.get('https://multiple-image-in-single-schima.vercel.app/api/v1/delete');
    setId(null);
  }
  
  return (
    <div className="container">
      {id && <div className='row'>

        <div className="col-md-4 mb-3">
          <img className="img-fluid" src={`https://multiple-image-in-single-schima.vercel.app/api/v1/profileImage/${id}?${new Date().getTime()}`} alt="profileImage" />

        </div>
        <div className="col-md-4 mb-3">
          <img className="img-fluid" src={`https://multiple-image-in-single-schima.vercel.app/api/v1/portfolioImage/${id}?${new Date().getTime()}`} alt="profileImage" />

        </div>
        <div className="col-md-4 mb-3">
          <img className="img-fluid" src={`https://multiple-image-in-single-schima.vercel.app/api/v1/bannerImage/${id}?${new Date().getTime()}`} alt="profileImage" />

        </div>

      </div>}
      <div className="row">
        <div className="col-md-4 mb-2">
          <Link to='/upload' className="btn btn-outline-success btn-lg ">upload</Link>
        </div>
        <div className="col-md-4 mb-2">
          <Link to="/update" className="btn btn-outline-warning btn-lg ">update</Link>
        </div>
        <div className="col-md-4 mb-2">
          <button onClick={deleteall} className="btn btn-outline-danger btn-lg ">delete</button>
        </div>
      </div>
    </div>
  )
}
