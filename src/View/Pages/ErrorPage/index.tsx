import React from 'react'
import Hero from '../../../assets/Static/JPEG/ErrorImage.jpg'
import {Link} from 'react-router-dom'
function ErrorPage() {
  return (
    <div className="error_page">
      <img src={Hero} alt="" />
      <div className="link_holder">
        <Link to="/home" className="error_page_link">
          go back
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage